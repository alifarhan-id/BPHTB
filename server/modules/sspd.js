const express = require('express')
const db = require('../config/connection')
const router = express.Router();

router.get('/api/v1/getsspd', async (req, res, next) => {
    let limit = 32;
    let page = req.query.page;
    let start = req.query.page;
    let offset = (page - 1) * limit;
    let query = "SELECT * FROM sspd_coba ORDER BY id DESC LIMIT " + limit + " OFFSET " + offset
    console.log(query)
    console.log(start)
    console.log(offset)
    await db.any(query)
        .then((data) => {
            res.status(200)
                .json({
                    status: 'success',
                    page_count: data.length,
                    page_number: page,
                    data: data,
                });
        })
        .catch((error) => {
            return next(error)
        })
})

module.exports = router