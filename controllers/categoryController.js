const db = require('../config/db');

exports.createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Nama kategori harus diisi' });
    }

    try {
        const query = 'INSERT INTO categories (name) VALUES (?)';
        const [result] = await db.execute(query, [name]);
        res.status(201).json({ message: 'Kategori berhasil dibuat', categoryId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        const query = 'SELECT * FROM categories';
        const [categories] = await db.execute(query);
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Nama kategori harus diisi' });
    }
    try {
        const query = 'UPDATE categories SET name = ? WHERE id = ?';
        const [result] = await db.execute(query, [name, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Kategori tidak ditemukan' });
        }
        res.status(200).json({ message: 'Kategori berhasil diperbarui' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM categories WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Kategori tidak ditemukan' });
        }
        res.status(200).json({ message: 'Kategori berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}