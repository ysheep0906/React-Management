const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

const db = new sqlite3.Database('./management.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
    console.error(dbPath);
  } else {
    console.log('Connected to the database.');
  }
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer = require('multer');
const upload = multer({dest: './upload'});

app.get('/api/customers', (req, res) => {
  db.serialize(() => {
    db.all('SELECT * FROM CUSTOMER WHERE isDeleted = 0', (err, rows, fields) => {
      res.send(rows);
    });
  });
});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES(null, ?, ?, ?, now(), 0)';
  console.log(req.file);
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender,job];
  db.serialize(() => {
    db.all(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
  });
});

app.delete('/api/customers/:id', (req,res) => {
  let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  db.serialize(() => {
    db.all(sql, params, (err,rows,field) => {
      res.send(rows);
    })
  })
})

app.listen(port, ()=> console.log(`Listening on port ${port}`));

process.on('SIGINT', () => {
  db.close((err) =>{
    if(err){
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
});
