const db = require('../config/db'); 

exports.createProduct = async (req, res) => {
    const { name, description, price, stock, category_id } = req.body;

    if (!name || !price || !stock) {
        return res.status(400).json({ message: 'Nama, harga, dan stok harus diisi' });
    }

    try {
        const query = 'INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [name, description, price, stock, category_id]);
        res.status(201).json({ message: 'Produk berhasil dibuat', productId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const query = 'SELECT * FROM products';
        const [products] = await db.execute(query);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT * FROM products WHERE id = ?';
        const [products] = await db.execute(query, [id]);

        if (products.length === 0) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }
        res.status(200).json(products[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, category_id } = req.body;

    if (!name || !price || !stock) {
        return res.status(400).json({ message: 'Nama, harga, dan stok harus diisi' });
    }

    try {
        const query = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? WHERE id = ?';
        const [result] = await db.execute(query, [name, description, price, stock, category_id, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }
        res.status(200).json({ message: 'Produk berhasil diperbarui' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM products WHERE id = ?';
        const [result] = await db.execute(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }
        res.status(200).json({ message: 'Produk berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}