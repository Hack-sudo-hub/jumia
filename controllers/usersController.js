const bcrypt = require('bcryptjs');
const db = require('../config/db');
const { response } = require('express');

// Register logic function
exports.registerUser = async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        password,
        phone,
        gender,
        address,

    } = req.body;

    try {
        //checking if user exist
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email,]);
        if  (rows.length > 0) {
            return response.status(400).json({message: 'User Already exists!'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const sql =
        'INSERT INTO users (first_name, last_name, email, password_hash, phone, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.execute(sql, [first_name,
        last_name,
        email,
        hashedPassword,
        phone,
        gender,
        address,]

        );

        res.status(201).json({message: 'User registered successfully!'}); 
    
     } catch (error) {
            res.status(500).json({message: 'An error occurred!', error});
        }

};