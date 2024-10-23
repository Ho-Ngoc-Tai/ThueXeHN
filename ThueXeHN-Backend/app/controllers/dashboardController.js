const db = require('../config/db');

const dashboardController = {
    getStatistics: async (req, res) => {
        try {
            // Count the number of users
            const [userCountResult] = await db.execute('SELECT COUNT(*) AS userCount FROM users');
            const userCount = userCountResult[0].userCount;

            // Count the number of asset categories
            const [assetCategoryCountResult] = await db.execute('SELECT COUNT(*) AS assetCategoryCount FROM asset_categories');
            const assetCategoryCount = assetCategoryCountResult[0].assetCategoryCount;

            // Count the number of password reset tokens
            const [resetTokenCountResult] = await db.execute('SELECT COUNT(*) AS resetTokenCount FROM password_reset_tokens');
            const resetTokenCount = resetTokenCountResult[0].resetTokenCount;

            // Count the number of notifications
            const [notificationCountResult] = await db.execute('SELECT COUNT(*) AS notificationCount FROM notifications');
            const notificationCount = notificationCountResult[0].notificationCount;

            // Count the number of rentals
            const [rentalCountResult] = await db.execute('SELECT COUNT(*) AS rentalCount FROM rentals');
            const rentalCount = rentalCountResult[0].rentalCount;

            // Calculate the total value of rented vehicles
            const [totalRentalValueResult] = await db.execute('SELECT SUM(rental_price) AS totalRentalValue FROM rentals');
            const totalRentalValue = totalRentalValueResult[0].totalRentalValue || 0;

            // Aggregate data and return to the client
            const statistics = {
                userCount,
                assetCategoryCount,
                resetTokenCount,
                notificationCount,
                rentalCount,
                totalRentalValue,
            };

            res.status(200).json(statistics);
        } catch (error) {
            console.error('Error fetching statistics:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = dashboardController;
