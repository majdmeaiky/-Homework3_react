import logo from './logo.svg';
import './App.css';
import Recipes from './Pages/Recipes';
import { Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo1 from './images/download.png';
import NewIngredient from './Pages/NewIngredient';
import React from 'react'
import FCContextProvider from './Pages/FCContext';
import NewRecipe from './Pages/NewRecipe';

function App() {

  
  return (
<FCContextProvider>

    <div>
      <Navbar bg="dark" variant="dark">
        <Container>

          <img src={logo1} style={{ width: '10%' }} />
          <Nav className="me-auto">


            <Nav.Link href="/">Recipes</Nav.Link>
            <Nav.Link href="/newRecipe">New Recipe </Nav.Link>
            <Nav.Link href="/newIngredient">New Ingredient</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/newIngredient" element={<NewIngredient />} />
        <Route path="/newRecipe" element={<NewRecipe />} />
      </Routes>


    </div>
    </FCContextProvider>

  );
}

export default App;
