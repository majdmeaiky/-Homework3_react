import React, { useContext, useEffect, useState } from 'react'
import { RecipesContext } from './FCContext'
import { Row, Col, Card, Collapse, Modal, Carousel } from 'antd';
import Button from 'react-bootstrap/Button';

const { Meta } = Card;

export default function Recipes() {

  const { recipes, setRecipes, ingredients, ingredientsInRecipe, setIngredientsInRecipe } = useContext(RecipesContext);
  const { Meta } = Card;


  const [visible, setVisible] = useState(false);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [ingredientsVisible, setIngredientsVisible] = useState(false);
  const [ingerdientVisible, setIngerdientVisible] = useState(false);



  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '12px',
    marginTop: '12px',
  }
  useEffect(() => {
    if (selectedRecipe !== null) {
      setVisible(true);
      console.log(selectedRecipe);

      const filteredIngredients = ingredientsInRecipe.filter(ingredient => ingredient.recipeId === selectedRecipe.id);

      // Set selectedIngredients array
      const selected = filteredIngredients.map(ingredient => {
        return ingredients.find(i => i.id === ingredient.ingrdientId);
      });
      setSelectedIngredients(selected);
    }
    else {
      setVisible(false);
    }
  }, [selectedRecipe]);

  const handleRecipeClick = recipe => {
    if (selectedRecipe !== recipe) {
      setSelectedRecipe(recipe);
    }
    else {
      setSelectedRecipe(null);
    }
  };

  const handleModalClose = () => {
    console.log(selectedRecipe);
    if (selectedRecipe != null) {
      setSelectedRecipe(null);
      setVisible(false);
    }
    else {
      setSelectedRecipe(null);
    }
  };

  const handleBtnClick = () => {
    setVisible(false);
    setIngredientsVisible(true);
  };

  const handleIngredientsModalClose = () => {
    setIngredientsVisible(false);
    setVisible(true);
    console.log(selectedIngredients);
  };

  const handleIngredientClick = ingredient => {
    if (selectedIngredient != null) {
      setSelectedIngredient(null);
      setIngerdientVisible(false);
    } else {
      setSelectedIngredient(ingredient);
      setIngerdientVisible(true);
    }
  };

  const handeIngredientModalClose = () => {
    setIngerdientVisible(false);
    setSelectedIngredient(null);
  };


  const recipeStr = recipes.map((recipe) =>
    <div>
      <Card
        hoverable
        style={{
          width: 130,
          marginLeft: '40px'
        }}

        cover={<img alt="example" src={recipe.imageUrl} />}
        key={recipe.id}
        onClick={() => {
          handleRecipeClick(recipe);
        }

        }
      >
        <Meta title={recipe.name} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />



      </Card><br></br>

      {/* for opening the modal of recipe detail */}
      {selectedRecipe ? (
        <Modal title={selectedRecipe.name} open={visible} onOk={handleModalClose} onCancel={handleModalClose}>
          <p>  <img src={selectedRecipe.imageUrl} style={{ width: '30%' }} /><br></br>
            cooking method: {selectedRecipe.cookingMethod}<br></br><br></br>
            cooking time: {selectedRecipe.time} mins
          </p>
          <Button onClick={() => handleBtnClick()} >Show Ingredients</Button>

        </Modal>
      ) : null}

        {/* for openenig the modal of all ingredients */}
      <Modal onCancel={handleIngredientsModalClose} onOk={handleIngredientsModalClose} open={ingredientsVisible}>
        <div style={containerStyle}>
          {selectedIngredients.map(ingredient => (
            <div>
              <Card hoverable
                onClick={() => handleIngredientClick(ingredient)}
                key={ingredient.id} cover={<img alt="example" src={ingredient.imageUrl} style={{ height: '100px' }} />} style={{ height: '100px' }}>
                <Meta title={ingredient.name} />
                <p>{ingredient.description}</p>
              </Card><br></br><br></br>
            </div>
          ))}
        </div>
      </Modal>


      {/* for opening ingredient details  */}
      {selectedIngredient ? (
        <Modal onCancel={handeIngredientModalClose} onOk={handeIngredientModalClose} title={selectedIngredient.name}
          // onClick={handleonclickModal}
          open={ingerdientVisible}

          width={800}
          style={{ textAlign: 'center' }}>
          <p>  <img src={selectedIngredient.imageUrl} style={{ width: '30%' }} /><br></br>
            calories: {selectedIngredient.calories} </p>
        </Modal>
      ) : null}
    </div>
  );

  return (

    <div>
      <h1 style={{ marginTop: '10%' }}>Our Recipes...</h1>
      <div style={containerStyle}>
        {recipeStr}

      </div>
    </div>
  )

};



