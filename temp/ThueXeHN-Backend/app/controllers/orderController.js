// orderController.js
const db = require('../config/db');

exports.createOrder = async (req, res) => {
  try {
    const insufficientQuantityProducts = [];
    const overlappingRentals = [];

    const order = {
      userId: req.body.userId,
      products: req.body.products,
      startDates: req.body.startDates,  
      endDates: req.body.endDates,  
      description: req.body.description,
      orderTotal: req.body.orderTotal,
      billing: req.body.billing,
      address: req.body.address,
      status: req.body.status,
    };

    for (let i = 0; i < order.products.length; i++) {
      const productItem = order.products[i];
      const productId = productItem.product;
      const quantity = productItem.quantity;
      const startDate = order.products[i].startDates;
      const endDate = order.products[i].endDates;

      // Check if there is insufficient quantity for the product
      const productQuery = 'SELECT * FROM rentals WHERE id = ?';
      const productResult = await db.query(productQuery, [productId]);

      if (!productResult || productResult.length === 0 || productResult[0].quantity < quantity) {
        insufficientQuantityProducts.push({
          productId,
          quantity: productResult.length > 0 ? productResult[0].quantity : 0,
        });
      }

      // Check for overlapping rentals during the specified period
      const overlappingQuery = `
        SELECT *
        FROM rental_information
        WHERE rental_id = ?
          AND NOT (end_date < ? OR start_date > ?)
      `;

      const overlappingResult = await db.query(overlappingQuery, [productId, startDate, endDate]);

      console.log(overlappingResult);
      
      if (overlappingResult.length > 0) {
        overlappingRentals.push({
          productId,
          overlappingResult,
        });
    
        // // Thông báo cho người dùng
        // return res.status(200).json({
        //   error: `Sản phẩm với ID ${productId} đã được đặt vào thời gian này.`,
        //   overlappingRentals,
        // });
      }
    }

    const insertOrderQuery = `
      INSERT INTO orders (user_id, products, description, order_total, billing, address, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    const orderValues = [
      order.userId,
      JSON.stringify(order.products),
      order.description,
      order.orderTotal,
      JSON.stringify(order.billing),
      order.address,
      order.status,
    ];

    const result = await db.query(insertOrderQuery, orderValues);

    // Insert rental information into the "rental_information" table
    console.log(order.products)
    for (let i = 0; i < order.products.length; i++) {
      const productId = order.products[i].product;
      const startDate = order.products[i].startDates;
      const endDate = order.products[i].endDates;
  
      const insertRentalInfoQuery = `
          INSERT INTO rental_information (rental_id, start_date, end_date)
          VALUES (?, ?, ?)
      `;
  
      const rentalInfoResult = await db.query(insertRentalInfoQuery, [productId, startDate, endDate]);
      const rentalId = rentalInfoResult.insertId;
  
      order.products[i].rentalId = rentalId;
  }
  
  // Cập nhật rental_id trong bảng orders
  const updateOrderIdQuery = 'UPDATE orders SET rental_id = ? WHERE id = ?';
  for (let i = 0; i < order.products.length; i++) {
      const productId = order.products[i].product;
      console.log(result)
      console.log("ID KET QUA:"+ result[0].insertId)
      // Kiểm tra xem orderId đã được trả về từ câu lệnh SQL trước đó
      if (result && result[0].insertId) {
          const orderId = result[0].insertId;
          await db.execute(updateOrderIdQuery, [productId, orderId]);
      } else {
          console.error('Error: orderId is not available.');
          // Xử lý trường hợp orderId không có sẵn
      }
  }

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;

    const getOrderQuery = 'SELECT * FROM orders WHERE id = ?';
    const orderResult = await db.query(getOrderQuery, [orderId]);

    if (!orderResult || orderResult.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(orderResult[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const getAllOrdersQuery = `
        SELECT orders.*, users.username, users.email
        FROM orders
        JOIN users ON orders.user_id = users.id
      `;
    const orders = await db.query(getAllOrdersQuery);

    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const getOrdersByUserQuery = 'SELECT * FROM orders WHERE user_id = ?';
    const orders = await db.query(getOrdersByUserQuery, [userId]);

    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.updateOrderDescriptionAndStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const newDescription = req.body.newDescription;
    const newStatus = req.body.newStatus;

    const updateQuery = 'UPDATE orders SET description = ?, status = ? WHERE id = ?';
    await db.execute(updateQuery, [newDescription, newStatus, orderId]);

    res.status(200).json({ message: 'Order description and status updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Trong orderController.js, thêm hàm mới để lấy danh sách đơn hàng của chủ xe
exports.getOrdersByOwner = async (req, res) => {
  try {
      const ownerId = req.params.ownerId;

      const getOrdersByOwnerQuery = `
          SELECT orders.*, rental_information.start_date, rental_information.end_date,
          users.username AS username, users.email AS email
          FROM orders
          JOIN rentals ON orders.rental_id = rentals.id
          JOIN rental_information ON rentals.id = rental_information.rental_id
          JOIN users ON rentals.user_id = users.id
          WHERE rentals.user_id = ?
      `;
      const orders = await db.query(getOrdersByOwnerQuery, [ownerId]);

      res.status(200).json(orders);
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
};
