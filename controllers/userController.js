const db = require('../config/db');

exports.createUser = async (req, res) => {
    const { name, email, password, address } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Nama, email, dan password harus diisi' });
    }
    try {
        const query = 'INSERT INTO users (name, email, password, address) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [name, email, password, address]);
        res.status(201).json({ message: 'User berhasil dibuat', userId: result.insertId });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Email sudah terdaftar' });
        }
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const query = 'SELECT id, name, email, address, created_at FROM users';
        const [users] = await db.execute(query);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}