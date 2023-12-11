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

app.get('/api/customers', (req, res) => {
  db.serialize(() => {
    db.all('SELECT * FROM CUSTOMER', (err, rows, fields) => {
      res.send(rows);
    });
  });
});

app.listen(port, ()=> console.log(`Listening on port ${port}`));

process.on('SIGINT', () => {
  db.close((err) =>{
    if(err){
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
});
