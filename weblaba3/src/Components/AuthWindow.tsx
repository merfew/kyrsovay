import Form from 'react-bootstrap/Form'; 
import {Button, Card, Alert} from 'react-bootstrap'; 
import { useDispatch } from 'react-redux'; 
import { setToken } from '../redux/AuthSlice'; 
import { useState, useEffect } from 'react'; 
//import useAuth from '../Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
export function AuthWindow() { 
  const navigate = useNavigate();
  //const {usertd} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const dispatch = useDispatch(); 
  const [token, setTokenValue] = useState<string>(''); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://localhost:7225/Auth/GetData', {'headers': {email: email, password: password}, withCredentials: true })
      //setUserId(response.data.id_users)
      console.log(response.data)
      if (response.data.length > 0) {
        PasswordReset();
      }
    } catch (error) {
      setShowWarning(true);
    }
  };
 
  useEffect(() => { 
    fetch('https://localhost:7225/login/sveta') 
      .then(res => res.text()) // Получаем текстовый ответ
      .then(responseText => {
        console.log(responseText); // Выводим ответ сервера на консоль
        setTokenValue(responseText); // Устанавливаем текст ответа как токен
        dispatch(setToken(responseText)); // Отправляем текст ответа в Redux
      })
      .catch(error => {
        console.error('Ошибка запроса:', error); // Выводим ошибку запроса на консоль
      });
  }, [dispatch]); 

    function PasswordReset() {
      fetch('https://localhost:7225/data',{ 
        headers: {
          'Authorization': `Bearer ${token}`
        }
        }) 
          .then(res => res.text()) // Получаем текстовый ответ
          .then(responseText => {
            console.log(responseText); 
            navigate("/home");
          })
          .catch(error => {
            console.error('Ошибка запроса:', error); // Выводим ошибку запроса на консоль
          });
    }

  return ( 
    <> 
    <div style={{ marginLeft: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <Card>
        <Card.Body>
          <h1>Login</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <br /> 
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <br /> 
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
          </Form>
          <br /> 
          {showWarning && <Alert variant="danger">Please fill in all fields!</Alert>}
          <Button variant="ok" onClick={handleLogin} >Ok</Button>{' '} 
        </Card.Body>
      </Card>
    </div>
    </> 
  ); 
} 

export default AuthWindow;