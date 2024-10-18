// createTables.js

const db = require('../config/db');

const createTables = async () => {
    try {
        // Tạo bảng "users" nếu chưa tồn tại
        await db.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                phone VARCHAR(255),
                username VARCHAR(255),
                password VARCHAR(255) NOT NULL,
                role VARCHAR(255),
                status VARCHAR(255) DEFAULT 'noactive',
                image VARCHAR(255) DEFAULT 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        console.log('Table "users" created or already exists.');

        // Thêm bảng "asset_categories"
        await db.execute(`
         CREATE TABLE IF NOT EXISTS asset_categories (
             id INT AUTO_INCREMENT PRIMARY KEY,
             name VARCHAR(255) NOT NULL,
             description TEXT,
             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
         )
     `);

        console.log('Table "asset_categories" created or already exists.');

        // Tạo bảng "password_reset_tokens" nếu chưa tồn tại
        await db.execute(`
        CREATE TABLE IF NOT EXISTS password_reset_tokens (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            token VARCHAR(255) NOT NULL,
            expires_at TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
        `);

        console.log('Table "password_reset_tokens" created or already exists.');

      

        // Tạo bảng "notifications" nếu chưa tồn tại
        await db.execute(`
         CREATE TABLE IF NOT EXISTS notifications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
       `);

        console.log('Table "notifications" created or already exists.');

        // Tạo bảng "rentals" nếu chưa tồn tại
        await db.execute(`
            CREATE TABLE IF NOT EXISTS rentals (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                seats INT NOT NULL,
                year INT NOT NULL,
                brand VARCHAR(255) NOT NULL,
                fuel_type VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                commune VARCHAR(255) NOT NULL,
                district VARCHAR(255) NOT NULL,
                description TEXT,
                image VARCHAR(255) DEFAULT 'https://example.com/default-image.jpg',
                is_rented BOOLEAN DEFAULT false,
                rental_price DECIMAL(10, 2),
                category_id INT,
                user_id INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES asset_categories(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        console.log('Table "rentals" created or already exists.');

        // Tạo bảng "news" nếu chưa tồn tại
        await db.execute(`
            CREATE TABLE IF NOT EXISTS news (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                image VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        console.log('Table "news" created or already exists.');

        // Tạo bảng "orders" nếu chưa tồn tại
        await db.execute(`
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                products JSON NOT NULL,
                description TEXT,
                order_total DECIMAL(10, 2) NOT NULL,
                billing JSON NOT NULL,
                address VARCHAR(255) NOT NULL,
                status VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        console.log('Table "orders" created or already exists.');

//          // Tạo bảng "orders" nếu chưa tồn tại
//          await db.execute(`
//          CREATE TABLE IF NOT EXISTS rental_information (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             rental_id INT NOT NULL,
//             start_date DATE,
//             end_date DATE,
//             FOREIGN KEY (rental_id) REFERENCES rentals(id)
//         );
//         `);

//      console.log('Table "orders" created or already exists.');

//        // Tạo bảng "orders" nếu chưa tồn tại
//        await db.execute(`
//        ALTER TABLE orders
//        ADD COLUMN rental_id INT,
//        ADD FOREIGN KEY (rental_id) REFERENCES rentals(id);
//       `);

//    console.log('Table "orders" created or already exists.');

        //  // Thêm cột category_id
        // await db.execute(`
        // ALTER TABLE rentals
        // ADD COLUMN category_id INT,
        // ADD CONSTRAINT fk_rentals_category
        // FOREIGN KEY (category_id)
        // REFERENCES asset_categories(id)
        // `);

        // // Thêm cột user_id
        // await db.execute(`
        // ALTER TABLE rentals
        // ADD COLUMN user_id INT,
        // ADD CONSTRAINT fk_rentals_user
        // FOREIGN KEY (user_id)
        // REFERENCES users(id)
        // `);

        // console.log('Columns added to "rentals" table.');

        // Thêm cột rental_id
        // await db.execute(`
        // ALTER TABLE orders
        // ADD COLUMN rental_id INT,
        // ADD FOREIGN KEY (rental_id) REFERENCES rentals(id);
        // `);

        // console.log('Column "rental_id" added to "orders" table.');


    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
    }
};

createTables();
