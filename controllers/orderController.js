const db = require('../config/db');

exports.createOrder = async (req, res) => {
    const { user_id, items } = req.body;

    if (!user_id || !items || items.length === 0) {
        return res.status(400).json({ message: 'User ID dan item pesanan harus diisi' });
    }

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        let totalAmount = 0;

        for (const item of items) {
            const { product_id, quantity } = item;

            const [products] = await connection.execute('SELECT * FROM products WHERE id = ?', [product_id]);

            if (products.length === 0) {
                throw new Error(`Produk dengan ID ${product_id} tidak ditemukan`);
            }

            const product = products[0];

            if (product.stock < quantity) {
                throw new Error(`Stok untuk produk ${product.name} tidak mencukupi`);
            }

            totalAmount += product.price * quantity;

            const newStock = product.stock - quantity;
            await connection.execute('UPDATE products SET stock = ? WHERE id = ?', [newStock, product_id]);
        }

        const [orderResult] = await connection.execute(
            'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
            [user_id, totalAmount]
        );
        const orderId = orderResult.insertId;

        for (const item of items) {
            const { product_id, quantity } = item;
            const [products] = await connection.execute('SELECT price FROM products WHERE id = ?', [product_id]);
            const productPrice = products[0].price;

            await connection.execute(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, product_id, quantity, productPrice]
            );
        }

        await connection.commit();
        res.status(201).json({ message: 'Pesanan berhasil dibuat', orderId: orderId });
    } catch (error) {
        if (connection) await connection.rollback();
        res.status(500).json({ message: 'Gagal membuat pesanan', error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

exports.getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const query = `
            SELECT 
                o.id as order_id, 
                o.total_amount, 
                o.status, 
                o.order_date,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'product_id', p.id,
                        'product_name', p.name,
                        'quantity', oi.quantity,
                        'price', oi.price
                    )
                ) as items
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            WHERE o.user_id = ?
            GROUP BY o.id
            ORDER BY o.order_date DESC;
        `;
        const [orders] = await db.execute(query, [userId]);

        if (orders.length === 0) {
            return res.status(404).json({ message: 'Tidak ada riwayat pesanan untuk user ini' });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}