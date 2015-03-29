var http = require('http');
var port = process.env.port || 1337;

// Fungsi sederhana untuk menuliskan respon.
//
// Hanya fokus ke penulisan response sederhana,
// karena pembahasan utama belum di sini.
//
// Parameter 1: Objek http.ServerResponse dari server
// Parameter 2: String untuk dikirimkan ke client
var WriteResponse = function (response, string) {
    response.writeHead(200, {
        'Content-Type': 'text/plain',   // penting agar client tau cara menampilkan data
        'Content-Length': string.length // penting agar client tau mau membaca sampai kapan
    });

    response.write(string);
    response.end();
};

// Mencetak berbagai data yang ada pada objek
// http.IncomingMessage
//
// Parameter 1: Objek http.IncomingMessage dari server
var IncomingMessageData = function (request) {
    console.log(request.method);
    console.log(request.url);
    console.log(request.headers);
};

// Membaca data dari HTTP Request GET
//
// yang diletakkan pada URL, di bagian Query String.
//
// Parameter 1: Objek http.IncomingMessage dari server
// Parameter 2: Objek http.ServerResponse dari server
var ReadGetData = function (request, response) {
    var url = require('url');
    var url_value = request.url;
    var url_object = url.parse(url_value, true);
    
    WriteResponse(response, JSON.stringify(url_object));
};

// Membaca data dari HTTP Request
//
// dengan format encoding application/x-www-form-urlencoded  
//
// Parameter 1: Objek http.IncomingMessage dari server
// Parameter 2: Objek http.ServerResponse dari server
var ReadFormDataUnencoded = function (request, response) {
    var qs = require('querystring');
    var data = "";

    request.on('data', function (chunck) {
        data = data + chunck;
    });

    request.on('end', function () {
        var object = qs.parse(data);
        
        WriteResponse(response, JSON.stringify(object));
    });
};

// Membaca data dari HTTP Request
//
// dengan format encoding multipart/form-data
// Kita menggunakan pustaka luar "multiparty" untuk ini.
// Ingat untuk update file package.json dan menjalankan npm install
// sebelum menggunakan fungsi.
//
// Parameter 1: Objek http.IncomingMessage dari server
// Parameter 2: Objek http.ServerResponse dari server
var ReadFormData = function (request, response) {
    var mp = require('multiparty');
    var form = new mp.Form();

    form.parse(request, function (err, fields, files) {
        var result = {
            'Fields': fields,
            'Files' : files
        };
        
        WriteResponse(response, JSON.stringify(result));
    });
};

// Fungsi sampel untuk menangani berbagai jenis HTTP Request
// 
// Jika ingin menambahkan penanganan method, silahkan tambahkan method
// baru pada bagian switch-case
//
// Parameter 1: Objek http.IncomingMessage dari server
// Parameter 2: Objek http.ServerResponse dari server
var HandleRequest = function (request, response) {
    var method = request.method;

    switch (method) {
        case "GET":
            // Kode untuk HTTP GET
            break;
        case "POST":
            // Kode untuk HTTP POST
            break;
        case "PUT":
            // Kode untuk HTTP PUT
            break;
        case "DELETE":
            // Kode untuk HTTP DELETE
            break;
        default:
            // Lain-lain
    }
};

// Fungsi yang akan dieksekusi ketika ada HTTP Request dari client.
// Pilih Fungsi yang mau dieksekusi.
var onRequest = function (request, response) {
    //IncomingMessageData(request);
    ReadGetData(request, response);
    //ReadFormDataUnencoded(request, response);
    //ReadFormData(request, response);
};

var server = http.createServer(onRequest);

server.listen(port, 'localhost');