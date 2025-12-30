const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const AuthController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // Validation
            if (!name || !email || !password) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            if (!validator.isEmail(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }

            if (password.length < 6) {
                return res.status(400).json({ error: 'Password must be at least 6 characters long' });
            }

            // Proceed with registration
            const user = await UserModel.create(name, email, password);

            // Exclude password from response
            const safeUser = { id: user.id, name: user.name, email: user.email, created_at: user.created_at };

            res.status(201).json({ message: 'User registered successfully', user: safeUser });
        } catch (err) {
            if (err.message.includes('duplicate key value violates unique constraint') || err.code === '23505') {
                return res.status(409).json({ error: 'Email already exists' }); // 409 Conflict
            }
            console.error(err); // Log for server debugging
            res.status(500).json({ error: 'Internal Server Error' }); // Generic message for user
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            if (!validator.isEmail(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }

            const user = await UserModel.findByEmail(email);
            if (!user) return res.status(401).json({ error: 'Invalid credentials' }); // 401 Unauthorized

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' }); // 401 Unauthorized

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({
                message: 'Login successful',
                token,
                user: { id: user.id, name: user.name, email: user.email }
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = AuthController;
