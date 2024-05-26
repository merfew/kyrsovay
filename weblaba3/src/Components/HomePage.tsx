import axios from 'axios'; 
import { useState, useEffect } from 'react'; 
import { Card, Button} from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom';
//import {userId} from './AuthWindow';
//import { useSelector } from 'react-redux';

 export interface User{
  first_name: string;
  id_users: number;
  last_name: string;
  phone_number: string;
 }

export function Home() { 
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [name1, setName1] = useState(''); 
  const [balance1, setBalance1] = useState(''); 
  const [name2, setName2] = useState(''); 
  const [balance2, setBalance2] = useState(''); 
  //const [user, setUser] = useState<User>();

  //const userId = useSelector((state: { user: { userId?: string } }) => state.user?.userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://localhost:7225/Home/GetData', { headers: { id: 1 }, withCredentials: true });
        const data1 = res.data
        const user = data1[0];
        setFirstName(user.first_name);  
        setLastName(user.last_name);
        console.log(user.first_name, user.last_name);

        const response = await axios.get('https://localhost:7225/Home/GetCard', { headers: { id: 1 }, withCredentials: true  });
        const data = response.data; 
        console.log(data);

        if (data.length > 0 && data.length <=2) {
          const firstCard = data[0]; 
          setName1(firstCard.name);
          setBalance1(firstCard.balance);
          console.log(firstCard.name, firstCard.balance);

          const secondCard = data[1]; 
          setName2(secondCard.name);
          setBalance2(secondCard.balance);
          console.log(secondCard.name, secondCard.balance);
        }
      }
      catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const details = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/card")
  }

  const details1 = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/account")
  }
 
  return ( 
    <div>
      <br/>
        <div style ={{display: 'flex', marginLeft: '300px', justifyContent: 'center', alignItems: 'center', fontSize: '30px', color: 'pink'}}>Добро пожаловать, {firstName} {lastName}!</div>

      <br/>

      <div style={{ display: 'flex' }}>
      <Card style={{ width: '18rem', marginLeft: '300px', marginRight: '20px', marginTop: '20px', display: 'block' }}>
        <Card.Img style={{ width: '270px', height: '150px' }} variant="top" src="https://i.pinimg.com/564x/49/73/8f/49738fb67b9a3d6887672a843400b7b3.jpg" /> 
        <Card.Body> 
          <Card.Title style={{marginLeft:'50px', justifyContent: 'center', alignItems: 'center', fontSize: '20px', color: 'pink'}}>{name1}</Card.Title> 
          <Card.Text style={{fontWeight: 'bold', marginLeft:'50px', justifyContent: 'center', alignItems: 'center', fontSize: '20px', color: 'pink'}}> 
            {balance1} ₽
          </Card.Text> 
          <Button style={{ color: 'pink', borderColor: 'pink', marginLeft:'30px' }} variant="outline-primary" onClick={details}>Информация о счете</Button> 
        </Card.Body> 
      </Card> 

      <Card style={{ width: '18rem', marginRight: '20px', marginTop: '20px' }}>
        <Card.Img style={{ width: '270px', height: '150px' }} variant="top" src="https://i.pinimg.com/564x/e0/cf/f5/e0cff502ae37d4e97d6639baa2c449c4.jpg" /> 
        <Card.Body> 
          <Card.Title style={{marginLeft:'50px', justifyContent: 'center', alignItems: 'center', fontSize: '20px', color: 'pink'}}>{name2}</Card.Title> 
          <Card.Text style={{fontWeight: 'bold', marginLeft:'50px', justifyContent: 'center', alignItems: 'center', fontSize: '20px', color: 'pink'}}> 
            {balance2} ₽
          </Card.Text> 
          <Button style={{ color: 'pink', borderColor: 'pink', marginLeft:'30px' }}  variant="outline-primary" onClick={details1}>Информация о счете</Button> 
        </Card.Body> 
      </Card>
      </div> 
    </div> 
  ); 
} 

export default Home;