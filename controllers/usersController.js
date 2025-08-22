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
        'INSERT INTO users (first_name, last_name, email, password_hash, phone, address) VALUES (?, ?, ?, ?, ?, ?)';
        db.execute(sql, [first_name,
        last_name,
        email,
        hashedPassword,
        phone,
        address,]

        );

        res.status(201).json({message: 'User registered successfully!'}); 
    
     } catch (error) {
        console.error('Full error:', error);
            res.status(500).json({
    message: 'An error occurred!',
    error: error.message || 'Unknown error'
  });
        }

};


// Login Logic begins here

exports.loginUser = async (request, response) => {
    const {email, password} = request.body;
    try {
        // check if user exist
        const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length == 0) {
            return response.status(400).json({message: "User not found! please register."});
        }
        const user = rows[0];

        //compare password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return response.status(400).json({message: "Invalid Credentials!"});
        }

        //set session storage

        request.session.user = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            address: user.address
        };
        response.status(200).json({
            message: "Login Successfull!",
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            phone: user.phone,
            address: user.address,
        });
    } catch (error) {
        response.status(500).json({message: "An error occured"});
    }
};