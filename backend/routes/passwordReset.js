const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const pool = require('../config/db'); // Подключение к базе данных
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'danya7364777@gmail.com',
        pass: 'rbumvybnahwqbezv',
    },
});

router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const query = 'SELECT * FROM users WHERE email = $1';
        const { rows } = await pool.query(query, [email]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const user = rows[0];
        const resetToken = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000); // 1 hour

        await pool.query('INSERT INTO password_resets (user_id, reset_token, expires_at) VALUES ($1, $2, $3)', [user.id, resetToken, expiresAt]);

        const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

        await transporter.sendMail({
            to: email,
            subject: 'Password Reset',
            text: `To reset your password, click on this link: ${resetLink}`,
        });

        res.json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ error: 'Failed to send password reset link' });
    }
});

router.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const query = 'SELECT * FROM password_resets WHERE reset_token = $1 AND expires_at > NOW()';
        const { rows } = await pool.query(query, [token]);
        if (rows.length === 0) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }
        const userId = rows[0].user_id;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateQuery = 'UPDATE users SET password = $1 WHERE id = $2';
        await pool.query(updateQuery, [hashedPassword, userId]);
        await pool.query('DELETE FROM password_resets WHERE user_id = $1', [userId]);

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Failed to reset password' });
    }
});

module.exports = router;
