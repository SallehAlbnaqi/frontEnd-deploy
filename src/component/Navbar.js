import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";



export default function Navbar({ token, setToken,admin }) {
  const [user, setuser] = useState([]);
  useEffect( async() => {
    if (token) {
      const response = await axios.get("http://localhost:5000/user", {
        headers: { authorization: "Bearer " + token },
      });
      setuser(response.data);
    }
  }, [])
  return (
    <div>
      {token ? (
        // اذا التوكن سجل دخولة يظهر له الناف بار
        //  <ul className="liToken">
        //    <li>
        //      <Link className="link" to="/" onClick={()=>{setToken("")}}>log out</Link>
        //    </li>

        //    <li>
        //      <Link className="link" onClick={() => { setToken("/Home")}}to="/login"></Link>
        //    </li>

        //     <li>
        //      <Link className="link" to="/Home" > Home</Link>
        //     </li>

        //     <li>
        //       <Link className="link" to="/vegetarianFood">vegetarianFood</Link>
        //     </li>

        //      <li>
        //      <Link className="link" to="/meatMeals">meatMeals</Link>
        //      </li>

        //      <li>
        //      <Link className="link" to="/FoodDiabetics">FoodDiabetics</Link>
        //      </li>
        //  </ul>
        <ul className="ul1">
          <li className="w3-button w3-inline w3-light white" id="ccvv">
            <Link id="ccvv" className="homelink" to="/Home">
              Home{" "}
            </Link>
          </li>
          <li className="w3-button w3-inline w3-light white" id="NavbarTitle">
            <Link to="/VegetarianFoood">Vegetarian Food</Link>
          </li>
          <li className="w3-button w3-inline w3-light white" id="NavbarTitle">
            <Link to="/Diet"> Diet</Link>
          </li>
          <li className="w3-button w3-inline w3-light white" id="NavbarTitle">
            <Link to="/FoodDiabetics">Food Diabetics</Link>
          </li>
          {/* <li className="w3-button w3-inline w3-light white" id="NavbarTitle"><Link  to="/Food">Food</Link></li> */}
          <li className="w3-button w3-inline w3-light white" id="NavbarTitle">
            <Link to="/Profille">Profile</Link>
          </li>

          <li className="logute">
            <Link
              to="/logout"
              onClick={() => {
                setToken("");
              }}
            >
              log out
            </Link>
          </li>
        </ul>
      ) : (
        <div>
          <ul>
            <li className="w3-button w3-right w3-black" id="NavbarTitle">
              {" "}
              <Link to="/login">login</Link>
            </li>
            <li className="w3-button w3-right w3-black" id="NavbarTitle">
              {" "}
              <Link to="/signUp">signUp</Link>
            </li>
            {/*1اذا مافيه توكين اظهر له اللوقن والساين اب*/}
          </ul>
        </div>
      )}
    </div>
  );
}

<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Link to="/Profille">Features</Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      
    </Nav>
    <Nav>
      <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>