var express = require('express');
var auth = require('./auth');
const verifikasi = require('./verfikasi');
var router = express.Router();

//daftarkan menu registrasi
router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);
router.get('/api/v1/rahasia',verifikasi(),auth.halamanrahasia);
//alamat yang perlu otorisasi;

module.exports=router;