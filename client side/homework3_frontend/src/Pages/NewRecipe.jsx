import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { RecipesContext } from './FCContext'
import Form from 'react-bootstrap/Form';
import { Row, Col, Card, Collapse, Modal, Carousel, Checkbox } from 'antd';

import swal from 'sweetalert';
import { color } from '@mui/system';

const { Meta } = Card;

export default function NewRecipe() {


    const { recipes, setRecipes, ingredients, setIngredients } = useContext(RecipesContext);

    const RecipesUrl = 'http://localhost:52501/api/Recipes';
    const IngredientsInRecipeUrl = 'http://localhost:52501/api/IngredientsInRecipe';

    // const ingredientsUrl=
    const [id, setId] = useState(Number);
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const [cookingMethod, setCookingMethod] = useState('');
    const [time, setTime] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [visible, setVisible] = useState(false);
    const [ingredientsVisible, setIngredientsVisible] = useState(false);

    const containerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridGap: '16px',
        marginTop: '16px',
    }


    useEffect(() => {
        console.log(selectedIngredients);

        setVisible(true);
    }, [selectedIngredient != null]);


    useEffect(() => {
        console.log(recipes.length);
        setId(recipes.length + 1);

    });

    const handleIngredientClick = ingredient => {
        if (selectedIngredient != null) {
            setSelectedIngredient(null);
        } else {
            setSelectedIngredient(ingredient);

        }
    };

    const handleModalClose = () => {
        console.log('before:' + selectedIngredient);
        if (selectedIngredient != null) {
            setSelectedIngredient(null);
        }
        setVisible(false);
    };

    const handleIngredientsModalClose = () => {

        setIngredientsVisible(false);
        console.log(selectedIngredients);
    };


    const handleCheckboxChange = (ingredient) => {
        if (selectedIngredients.includes(ingredient)) {
            setSelectedIngredients(selectedIngredients.filter((i) => i !== ingredient));
        } else {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    };

    const handleBtnClick = () => {

        setIngredientsVisible(true);
    };

    const btnClick = (event) => {
        console.log(selectedIngredients);
        console.log(recipes.length);
        event.preventDefault();
        const recipe = { id, name, imageUrl, cookingMethod, time };

        fetch(RecipesUrl, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8',
            }),
            body: JSON.stringify(recipe)
        })
            .then(res => {
                return res.json()
            })
            .then((data) => {
                // alert('congratulationns, tou added a new recipe');
                console.log('Success:', data);
                setRecipes([...recipes, { recipe }]);
                setImageUrl('')
                setName('');
                setTime('');
                setCookingMethod('');
                setSelectedIngredients([]);

                const ingredientsInRecipe = { recipeId: data.id, selectedIngredients };
                fetch(IngredientsInRecipeUrl, {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json; charset=UTF-8',
                    }),
                    body: JSON.stringify(ingredientsInRecipe)
                })
                    .then(res => {
                        return res.json()
                    })
                    .then((data) => {
                        console.log('Success:', data);

                        swal("Success", "New Recipe Added", "success");
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };



    const ingredientsStr = ingredients.map((ingredient) => (
        <div>

            <Card
                style={{
                    // height:'200px',
                    width: 130,
                    color: 'rgba(255, 0, 0, 0.5)'
                }}
                hoverable
                cover={<img alt="example" src={ingredient.imageUrl} style={{ width: '100%', height: '100px' }} />}
                key={ingredient.id}
                onClick={() => handleIngredientClick(ingredient)}
            >
                <Meta title={ingredient.name} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '15px' }} />
                <Checkbox value={ingredient.id}
                    onChange={() => handleCheckboxChange(ingredient)}
                    checked={selectedIngredients.includes(ingredient)}
                    style={{ marginLeft: '25px', marginTop: '15px', color: 'red' }}

                ></Checkbox>



            </Card>
            {selectedIngredient ? (
                <Modal onCancel={handleModalClose} title={selectedIngredient.name}
                    // onClick={handleonclickModal}
                    open={visible}

                    width={800}
                    style={{ textAlign: 'center' }}>
                    <p>  <img src={selectedIngredient.imageUrl} style={{ width: '30%' }} /><br></br>
                        calories: {selectedIngredient.calories} </p>
                </Modal>
            ) : null}
            <br></br>
        </div>

    ));



    return (
        <div>
            <Form style={{ margin: '50px' }} onSubmit={btnClick}>
                <h3>New Recipe</h3><br />
                <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="name" value={name} onChange={(event) => setName(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control type="imageUrl" placeholder="Image Url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
                </Form.Group>


                <Form.Group className="mb-3" >
                    <Form.Label>Cooking Method</Form.Label>
                    <Form.Control type="imageUrl" placeholder="Cooking Method" value={cookingMethod} onChange={(event) => setCookingMethod(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="imageUrl" placeholder="Time" value={time} onChange={(event) => setTime(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ingredients</Form.Label><br></br>
                    <Form.Label><Button onClick={() => handleBtnClick()} >Show Ingredients</Button></Form.Label>
                    <Modal onCancel={handleIngredientsModalClose} onOk={handleIngredientsModalClose} open={ingredientsVisible}>
                        <div style={containerStyle}>
                            {ingredientsStr} </div>

                    </Modal>










                </Form.Group>



                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </div>
    )
}



