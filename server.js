const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/customers', (req,res) => {
  res.send(
    [{
      'id': 1,
      'image': 'https://picsum.photos/id/10/64/64',
      'name': '홍길동',
      'birthday': '961222',
      'gender': '남자',
      'job': '대학생'
    },
    {
      'id': 2,
      'image': 'https://picsum.photos/id/20/64/64',
      'name': '양신희',
      'birthday': '001222',
      'gender': '남자',
      'job': '대학생'
    }, 
    {
      'id': 3,
      'image': 'https://picsum.photos/id/30/64/64',
      'name': '권준석',
      'birthday': '051222',
      'gender': '남자',
      'job': '대학생'
    }
  ]);
});

app.listen(port, ()=> console.log(`Listening on port ${port}`));
