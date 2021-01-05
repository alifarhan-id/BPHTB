const express = require('express')
const db = require('../config/connection')
const router = express.Router();

router.get('/api/v1/getsspd', async (req, res, next) => {
    let limit = 32;
    let page = req.query.page;
    let start = req.query.page;
    let offset = (page - 1) * limit;
    let query = "SELECT * FROM sspd_coba ORDER BY id DESC LIMIT " + limit + " OFFSET " + offset
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
router.post('/api/v1/postsspd', (req, res, next) => {
    db.one('INSERT INTO sspd_coba (no_sspd, nik, nama_wp, alamat_wp, nop, alamat_op, luas_tanah, luas_bangunan, njop_pbb)VALUES(${no_sspd}, ${nik}, ${nama_wp}, ${alamat_wp}, ${nop}, ${alamat_op}, ${luas_tanah}, ${luas_bangunan}, ${njop_pbb}) RETURNING *', req.body)
        .then((data) => {
            res.status(200).json({
                status: 'successs',
                message: 'Data Berhasil di tambah',
                data: data,
            })
        })
        .catch((error) => {
            return next(error)
        })
})
router.put('/api/v1/updatesspd', (req, res, next) => {
    const {
        no_sspd,
        nik,
        nama_wp,
        alamat_wp,
        nop,
        alamat_op,
        luas_tanah,
        luas_bangunan,
        njop_pbb,
        create_at,
        id
    } = req.body;
    db.none('UPDATE sspd_coba SET no_sspd = $1, nik=$2, nama_wp=$3, alamat_wp = $4, nop = $5, alamat_op = $6, luas_tanah = $7, luas_bangunan = $8, njop_pbb = $9, create_at = $10 WHERE id = $11',
            [no_sspd, nik, nama_wp, alamat_wp, nop, alamat_op, luas_tanah, luas_bangunan, njop_pbb, create_at, id])
        .then((data) => {
            res.status(200).json({
                status: 'successs',
                message: 'Data Berhasil di tambah',
                data: data,
            })
            console.log(data)
        })
        .catch((error) => {
            return next(error)
        })
})

module.exports = router