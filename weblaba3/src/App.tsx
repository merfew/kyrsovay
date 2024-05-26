//import React from 'react';
import AuthWindow from './Components/AuthWindow';   
import HomePage from './Components/HomePage';   
import CardPage from './Components/CardPage';   
import AccountPage from './Components/AccountPage';  
import TransferPage from './Components/TransferPage';   
import TransferOutPage from './Components/TransferOutPage';   
import TransferHistory from './Components/TransferHistory';   
import NavbarComponent from './Components/navbar'; 
//import Context from './Context';
import {Footer} from './Components/footer'; 
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';   

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

const App = () => {   
  const location = useLocation();   
  const showNavbar = location.pathname !== "/" && location.pathname !== "/auth"; 
   
  return (   
    <>   
      {showNavbar && <NavbarComponent/>}    
      <Routes>   
        <Route path="/" element={<AuthWindow/>}/>   
        <Route path="auth" element={<AuthWindow/>}/>   
        <Route path="home" element={<HomePage/>}/>   
        <Route path="card" element={<CardPage/>}/>
        <Route path="account" element={<AccountPage/>}/>    
        <Route path="transferin" element={<TransferPage/>}/>   
        <Route path="transferout" element={<TransferOutPage/>}/>   
        <Route path="history" element={<TransferHistory/>}/>   
      </Routes>  
      {showNavbar && <Footer/>}  
    </>  
  );   
};   
   
export default AppWrapper;
