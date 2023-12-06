import Customer from './components/Customer';
import './App.css';

const cus = [{
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
}]

function App() {
  return (
    <div>
      {
        cus.map(c => {return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}></Customer>); })
      }
      
    </div>
  );
}

export default App;
