import { Form, Button} from 'react-bootstrap'; 
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function CardPage() {
  const navigate = useNavigate();
    const [name1, setName] = useState(''); 
    const [balance1, setBalance] = useState('');
    const [number1, setNumber] = useState('');
    const [date1, setDate] = useState('');
    const [cvc1, setCvc] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('https://localhost:7225/Home/GetCardInfo', {headers:{id: 1}, withCredentials: true  });
                const data = response.data; 
        
                if (data.length > 0) {
                  const firstCard = data[0]; 
                  setName(firstCard.name);
                  setBalance(firstCard.balance);
                  setNumber(firstCard.number);
                  setDate(firstCard.date);
                  setCvc(firstCard.cvc);
                  console.log(firstCard.name, firstCard.balance, firstCard.number, firstCard.date, firstCard.cvc);
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
        navigate("/transferin")
      }

    return(
        <div style = {{marginLeft:'500px'}}>
            {/* <Card style={{ width: '18rem', marginRight: '20px',marginTop: '20px' }}>
               <Card.Img variant="top" src="https://egaist.info/wp-content/uploads/2021/09/karty-sberbanka-bez-platy-za-obsluzhivanie-debetovye-zarplatnye-kreditnye-finansy-12d2114.jpg" /> 
               <Card.Body> 
                  <Card.Title>{name1}</Card.Title> 
                  <Card.Text> 
                  {balance1} 
                  </Card.Text> 
                </Card.Body> 
            </Card>  */}
            <Form.Label style ={{justifyContent: 'center', alignItems: 'center', fontSize: '20px', color: 'pink', fontWeight: 'bold'}}>Информация о счете</Form.Label>
            <br/>
            {/* <img style={{ width: '180px', height: '100px' }} src="https://i.pinimg.com/564x/49/73/8f/49738fb67b9a3d6887672a843400b7b3.jpg"/> */}
            {/* <br/> */}
            <Form.Label style ={{justifyContent: 'center', alignItems: 'center', fontSize: '20px'}}>Название счета</Form.Label>
            <br/>
            <Form.Label style ={{justifyContent: 'center', alignItems: 'center', fontSize: '20px', color: 'pink'}}>{name1}</Form.Label>
            <br/>
            <Form.Label style ={{justifyContent: 'center', alignItems: 'center', fontSize: '20px'}}>Баланс</Form.Label>
            <br/>
            <Form.Label style ={{justifyContent: 'center', alignItems: 'center', fontSize: '20px', color: 'pink'}}>{balance1}</Form.Label>
            <br/>
            <Form.Label style ={{justifyContent: 'center', alignItems: 'center', fontSize: '20px'}}>Номер карты</Form.Label>
            <br/>
            <Form.Label style ={{justifyContent: 'center', alignItems: 'center', fontSize: '20px', color: 'pink'}}>{number1}</Form.Label>
            <br/>
            <Form.Label style ={{justifyContent: 'center', alignItems: 'center', fontSize: '20px'}}>Срок действия</Form.Label>
            <br/>
            <Form.Label style ={{justifyContent: 'center', alignItems: 'center', fontSize: '20px', color: 'pink'}}>{date1}</Form.Label>
            <br/>
            <Form.Label style ={{justifyContent: 'center', alignItems: 'center', fontSize: '20px'}}>Код безопасности(cvc)</Form.Label>
            <br/>
            <Form.Label style ={{justifyContent: 'center', alignItems: 'center', fontSize: '20px', color: 'pink'}}>{cvc1}</Form.Label>
            <br/>
            <Button style = {{color: 'pink', borderColor: 'pink', marginTop: '25px', width:'200px'}} variant="primary" onClick={details}>Перевод</Button> 
        </div>
    )
}
export default CardPage;
