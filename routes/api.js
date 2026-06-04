const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/db-check', async (req, res) => {
    try {

        const [rows] = await db.query('SELECT NOW() AS server_time');

        res.json({
            success: true,
            message: 'MySQL bağlantısı başarılı',
            data: rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: 'MySQL bağlantı hatası',
            error: error.message
        });

    }
});

router.get('/status', async (req, res) => {

    try {

        const [rows] = await db.query(`
            SELECT *
            FROM status
        `);

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


router.post('/new-cmd', async (req, res) => {

    try {

        const { command, did, sid } = req.body;

        const [result] = await db.query(
            `
            INSERT INTO status
            (command, did, sid)
            VALUES (?, ?, ?)
            `,
            [command, did, sid]
        );

        res.json({
            success: true,
            insertId: result.insertId
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

module.exports = router;