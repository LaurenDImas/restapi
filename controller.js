'use strict';
var response = require('./res');
var connection = require('./koneksi');

exports.index =  function(req,res){
    response.ok('Aplikasi Rest API aku berjalan !',res)
}

//menampilkan semua data mahasiswa
exports.tampilSemuaMahasiswa = function(req,res){
    connection.query('SELECT * FROM mahasiswa', function(error,rows,fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows,res)
        }
    })  
}

//menampilkan semua data mahasiswa berdasarkan id
exports.tampilBerdasarkanId = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id],
        function(error,rows,fields){
            if(error){
                console.log(error);
            }else{
                response.ok(rows,res);
            }
        }
    )
}

//menambahkan data mahasiswa
exports.tambahMahasiswa = function(req,res){
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)',
        [nim,nama,jurusan],
        function(error,rows,field){
            if(error){
                console.log(error);
            }else{
                response.ok("Berhasil Menambahkan Data!",res)
            }
        })
}

//mengubah data berdasarkan id
exports.ubahMahasiswa = function(req,res){
    var id = req.body.id_mahasiswa;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;
    connection.query('UPDATE mahasiswa SET nim=?,nama=?,jurusan=? WHERE id_mahasiswa=?',
    [nim,nama,jurusan,id],
    function(error,rows,field){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Ubah Data!",res)
        }
    })
}

//menghapus data berdasarkan id
exports.hapusMahasiswa = function(req,res){
    var id = req.body.id_mahasiswa;
    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa=?',[id],
    function (error,rows,fields){
        if(error){
            console.log(error)
        }else{
            response.ok("Berhasil hapus data", res)
        }
    })
}

//menampilkan matakuliah group
exports.tampilGroupMatakuliah = function(req,res){
    connection.query('SELECT mahasiswa.id_mahasiswa,mahasiswa.nim,mahasiswa.nama,mahasiswa.jurusan,matakuliah.matakuliah,matakuliah.sks FROM krs INNER JOIN mahasiswa ON mahasiswa.id_mahasiswa=krs.id_mahasiswa INNER JOIN matakuliah on matakuliah.id_matakuliah = krs.id_matakuliah ORDER BY mahasiswa.id_mahasiswa',function(error,rows,fields){
        if(error){
            console.log(error);
        }else{
            response.oknested(rows,res)
        }
    });
}
