const db = require('../config/db');

exports.getAllRentals = async (req, res) => {
    try {
        const [rentals] = await db.execute('SELECT rentals.*, asset_categories.name as category_name FROM rentals LEFT JOIN asset_categories ON rentals.category_id = asset_categories.id');

        // Kiểm tra và cập nhật trạng thái is_rented cho mỗi sản phẩm trong tất cả các thuê
        for (const rental of rentals) {
            const productId = rental.id;
            const startDate = rental.start_date;
            const endDate = rental.end_date;

            // Kiểm tra nếu sản phẩm này đang có người thuê với ngày hợp lệ
            const checkRentalQuery = `
                SELECT id
                FROM rental_information
                WHERE rental_id = ?
                    AND NOT (end_date < ? OR start_date > ?)
            `;

            const existingRental = await db.query(checkRentalQuery, [productId, startDate, endDate]);

            // Cập nhật trạng thái is_rented trong bảng rentals
            const updateRentalStatusQuery = 'UPDATE rentals SET is_rented = ? WHERE id = ?';

            if (existingRental.length > 0) {
                // Nếu có người thuê với ngày hợp lệ, cập nhật is_rented là 3
                await db.execute(updateRentalStatusQuery, [3, productId]);
            } else {
                // Nếu không có ai thuê hoặc có người thuê nhưng không hợp lệ, cập nhật is_rented là 0
                await db.execute(updateRentalStatusQuery, [0, productId]);
            }
        }

        res.json(rentals);
    } catch (error) {
        console.error('Error getting rentals:', error);
        res.status(500).send('Internal Server Error');
    }
};


exports.getRentalById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rental] = await db.execute('SELECT rentals.*, asset_categories.name as category_name FROM rentals LEFT JOIN asset_categories ON rentals.category_id = asset_categories.id WHERE rentals.id = ?', [id]);
        if (rental.length > 0) {
            res.json(rental[0]);
        } else {
            res.status(404).send('Rental not found');
        }
    } catch (error) {
        console.error('Error getting rental by ID:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.createRental = async (req, res) => {
    const {
        title,
        name,
        seats,
        year,
        brand,
        fuel_type,
        address,
        commune,
        district,
        description,
        image,
        rental_price,
        category_id,
        user_id
    } = req.body;

    try {
        await db.execute(
            'INSERT INTO rentals (title, name, seats, year, brand, fuel_type, address, commune, district, description, image, rental_price, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [title, name, seats, year, brand, fuel_type, address, commune, district, description, image, rental_price, category_id, user_id]
        );
        res.json({ message: 'Rental created successfully' });
    } catch (error) {
        console.error('Error creating rental:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateRental = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        name,
        seats,
        year,
        brand,
        fuel_type,
        address,
        commune,
        district,
        description,
        image,
        rental_price,
        category_id,
        user_id
    } = req.body;

    try {
        let updateFields = 'UPDATE rentals SET title=?, name=?, seats=?, year=?, brand=?, fuel_type=?, address=?, commune=?, district=?, description=?, rental_price=?, category_id=?, user_id=?';
        const updateValues = [title, name, seats, year, brand, fuel_type, address, commune, district, description, rental_price, category_id, user_id];

        // Kiểm tra xem image có được cung cấp không
        if (image) {
            updateFields += ', image=?';
            updateValues.push(image);
        }

        // Thêm điều kiện WHERE id=?
        updateFields += ' WHERE id=?';
        updateValues.push(id);

        await db.execute(updateFields, updateValues);
        res.json({ message: 'Rental updated successfully' });
    } catch (error) {
        console.error('Error updating rental:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteRental = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM rentals WHERE id = ?', [id]);
        res.json({ message: 'Rental deleted successfully' });
    } catch (error) {
        console.error('Error deleting rental:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.searchRentals = async (req, res) => {
    const { query } = req.query;
    try {
        const [rentals] = await db.execute(
            'SELECT rentals.*, asset_categories.name as category_name FROM rentals LEFT JOIN asset_categories ON rentals.category_id = asset_categories.id WHERE rentals.title LIKE ? OR rentals.name LIKE ? OR rentals.brand LIKE ? OR rentals.fuel_type LIKE ? OR rentals.address LIKE ? OR rentals.commune LIKE ? OR rentals.district LIKE ?',
            Array(7).fill(`%${query}%`)
        );
        res.json(rentals);
    } catch (error) {
        console.error('Error searching rentals:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateIsRented = async (req, res) => {
    const { id } = req.params;
    const { is_rented } = req.body;
    console.log(is_rented);
    try {
        // Kiểm tra giá trị is_rented có hợp lệ không
        if (typeof is_rented !== 'number' || ![0, 1, 2, 3].includes(is_rented)) {
            return res.status(400).json({ error: 'Invalid is_rented value' });
        }

        await db.execute('UPDATE rentals SET is_rented = ? WHERE id = ?', [is_rented, id]);
        res.json({ message: 'is_rented updated successfully' });
    } catch (error) {
        console.error('Error updating is_rented:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getRentalsByCategory = async (req, res) => {
    const { category_id } = req.params;

    try {
        const query = 'SELECT rentals.*, asset_categories.name as category_name FROM rentals LEFT JOIN asset_categories ON rentals.category_id = asset_categories.id WHERE rentals.category_id = ?';
        const [rentals] = await db.execute(query, [category_id]);

        res.json(rentals);
    } catch (error) {
        console.error('Error getting rentals by category:', error);
        res.status(500).send('Internal Server Error');
    }
};