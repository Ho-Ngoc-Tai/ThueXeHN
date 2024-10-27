const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2'); 
const app = express();
const _CONST = require('./app/config/constant')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

require('./app/models/createTables');

// Thay đổi kết nối cơ sở dữ liệu
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'root',
    database: 'residential'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('Connected to MySQL.');
    }
});

const authRoute = require('./app/routers/auth');
const userRoute = require('./app/routers/user');
const assetCategoryRoute = require('./app/routers/assetCategoryRoutes');
const notificationRoutes = require('./app/routers/notificationRoutes');
const paymentRoute = require('./app/routers/paypal');
const dashboardRouter = require('./app/routers/dashboardRouter');
const rentalsRouter = require('./app/routers/rentalRouter');
const newsRouter = require('./app/routers/newsRouter');
const orderRouter = require('./app/routers/orderRouter');


app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/assetCategory', assetCategoryRoute);
app.use('/api/notifications', notificationRoutes);
app.use('/api/payment', paymentRoute);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/rentals', rentalsRouter);
app.use('/api/news', newsRouter);
app.use('/api/order', orderRouter);


const PORT = process.env.PORT || _CONST.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
