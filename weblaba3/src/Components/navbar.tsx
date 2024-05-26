// navbar.tsx
import { Navbar, Container, Nav} from "react-bootstrap";
import { NavLink } from "react-router-dom";

export function NavbarComponent() {
  return (
    <div>
    <Navbar bg="light" expand="lg" variant="light" style={{position: 'fixed', top: 0, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <Container fluid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src="https://sun6-23.userapi.com/s/v1/ig2/0tdW1O5v-VZ_t9Nw_huIrArOzVUYP2R9KeVzcwZTdFwi7eH4tRfE1eHm8AIdsVdJ5_FXQS1n_ay7GCiBR_aBVDR0.jpg?size=50x50&quality=95&crop=1,0,1022,1022&ava=1" />
        <Navbar.Brand href="/home" style={{fontSize: '40px', marginLeft: '20px', background:'beigh', color: 'pink', fontWeight: 'bold' }}>Мяу Банк</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{background: 'beigh'}}>
            <NavLink to={"/home"} className="nav-link" style={{fontSize: '25px', marginLeft: '100px', color: 'pink' }}>Главная</NavLink>
            <NavLink to={"/transferin"} className="nav-link" style={{fontSize: '25px', marginLeft: '50px', color: 'pink' }}>Переводы</NavLink>
            <NavLink to={"/history"} className="nav-link" style={{fontSize: '25px', marginLeft: '50px', color: 'pink' }}>История</NavLink>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse style={{marginLeft: '300px'}} className="justify-content-end">
          <Navbar.Text style={{color: 'pink', fontSize: '20px'}}>
            8 900 500 60 60
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}
export default NavbarComponent;
