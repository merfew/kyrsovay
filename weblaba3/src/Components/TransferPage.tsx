import {Dropdown, Form, Button, Alert} from 'react-bootstrap'
import { useState,useEffect } from 'react';
import axios from 'axios'; 

export function TransferPage(){
    const [name1, setName1] = useState(''); 
    const [name2, setName2] = useState('');
    const [otkyda, setOtkyda] = useState(''); 
    const [kyda, setKyda] = useState('');
    const [sum, setSum] = useState('');
    const [show, setShow] = useState(false);

    const Transfer = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          setShow(true);
          console.log(otkyda, kyda, sum);
          const payload = {
            Id: 1, // Используйте правильный id
            Otkyda: otkyda, 
            Kyda: kyda, 
            Sum: parseInt(sum, 10) // Убедитесь, что sum - это число
        };
        await axios.post('https://localhost:7225/Home/SaveHistory', payload, { withCredentials: true });
        console.log("История сохранена успешно");

        await axios.post('https://localhost:7225/Home/TransferIn', payload, { withCredentials: true })

        await axios.post('https://localhost:7225/Home/TransferInPlus', payload, { withCredentials: true })

        }   catch (error) {
          if (axios.isAxiosError(error)) {
            // Это ошибка от Axios
            console.error("Ошибка в запросе Axios:", error.message);
            if (error.response) {
              // Сервер ответил кодом статуса, который выходит за пределы диапазона 2xx
              console.error("Данные:", error.response.data);
              console.error("Статус:", error.response.status);
              console.error("Заголовки:", error.response.headers);
            } else if (error.request) {
              // Запрос был сделан, но ответ не был получен
              console.error("Запрос:", error.request);
            } else {
              // Что-то другое, что привело к ошибке запроса
              console.error("Ошибка:", error.message);
            }
          } else {
            // Неожиданная ошибка во время выполнения запроса
            console.error("Ошибка выполнения запроса:", error);
          }
        }
      
      };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://localhost:7225/Home/CardTransfer', { headers: { id: 1 }, withCredentials: true  });
            const data = response.data; 
    
            if (data.length > 0 && data.length <=2) {
              const firstCard = data[0]; 
              setName1(firstCard.name);
              console.log(firstCard.name);
    
              const secondCard = data[1]; 
              setName2(secondCard.name);
              console.log(secondCard.name);
            }
          }
          catch (error) {
            console.error(error);
          }
          
          if (name1) {
            setOtkyda(name1);
          }
        };
        fetchData();
        }, [name1]); 
        
     // }, []);

    return(
        <div>
            <Dropdown style={{marginLeft: '500px', width: '300px'}}>
                <Dropdown.Toggle style ={{color: 'pink', fontSize: '20px'}} variant="success" id="dropdown-basic">
                Вариант перевода 
                </Dropdown.Toggle>

                <Dropdown.Menu style={{marginTop: '60px'}}>
                    <Dropdown.Item style ={{color: 'pink', fontSize: '20px', display: 'flex'}} href="/transferin">Перевод между своими</Dropdown.Item>
                    <Dropdown.Item style ={{color: 'pink', fontSize: '20px'}} href="/transferout"> Перевод другому человеку</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <br/>

            <div style={{ color: 'pink', fontSize: '20px', marginLeft: '500px', marginTop: '50px'}}>
                Откуда
            </div>
            <Form.Select style={{color: 'pink', fontSize: '20px', marginLeft: '500px', marginTop: '10px', width: '300px'}} value = {otkyda} aria-label="Default select example" onChange={(e) => setOtkyda(e.target.value)}>
                <option value = {name1}>{name1}</option>
                <option value={name2}>{name2}</option>
            </Form.Select>

            <div style={{ color: 'pink', fontSize: '20px', marginLeft: '500px'}}>
                Куда
            </div>
            <Form.Select style={{color: 'pink', fontSize: '20px', marginLeft: '500px', width: '300px'}} value = {kyda} aria-label="Default select example" onChange={(e) => setKyda(e.target.value)}>
                <option value = {name1}>{name1}</option>
                <option value={name2}>{name2}</option>
            </Form.Select>

            <div style={{ color: 'pink', fontSize: '20px', marginLeft: '500px'}}>
                Сколько
            </div>
            <Form>
            <Form.Group style={{color: 'pink', fontSize: '20px', marginLeft: '500px'}} className="mb-3" controlId="exampleForm.ControlInput1" >
                <Form.Control style = {{width: '300px'}} value = {sum} type="sum" onChange={(e) => setSum(e.target.value)}/>
            </Form.Group>
            </Form>

            {show && <Alert style = {{marginLeft: '550px', marginTop:'25px', color: 'pink', fontSize:'20px'}} variant="success">Перевод выполнен!</Alert>}
            {/* {show && <Alert style = {{marginLeft: '550px', color: 'pink', fontSize:'20px'}} variant="danger">Недостаточно средств</Alert>} */}
            <Button style={{ color: 'pink', borderColor: 'pink', marginLeft:'500px', marginTop:'25px', width: '300px' }} onClick={Transfer}>Перевести</Button>
        </div>
    )
}
export default TransferPage;