const express = require('express');
const mysql = require("mysql");
const multer = require("multer");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ilham234',
    database: 'ibos'
});

db.connect(function(err) {
    if (err) {
        console.log("Error in connection:", err);
    } else {
        console.log("Connected to the database");
    }
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage }).single('file');

app.get('/', (req, res) => {
    res.send('From server side');
});

app.post('/create', upload, (req, res) => {
    const sql = "INSERT INTO users(`email`, `pw`, `image`) VALUES (?, ?, ?)";
    const values = [
        req.body.email,
        req.body.pw,
        req.file.filename
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error in sign up query:", err);
            return res.status(500).json({ error: 'Error in sign up query' });
        }
        return res.json({ status: "Success" });
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
