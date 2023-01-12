import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RecipesContext } from './FCContext'
import React, { useContext, useEffect, useState } from 'react';
import swal from 'sweetalert';


export default function NewIngredient() {
    const { ingredients, setIngredients } = useContext(RecipesContext);

    const apiUrl = 'http://localhost:52501/api/Ingredient';

    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [Calories, setCalories] = useState(Number);
    const [id, setId] = useState(Number);

    useEffect(() => {
        setId(ingredients.length + 1);

    })

    const btnClick = (event) => {
        event.preventDefault();
        const ingrediant = { id, name, imageUrl, Calories };

        fetch(apiUrl, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8',
            }),
            body: JSON.stringify(ingrediant)
        })
            .then(res => {
                return res.json()
            })
            .then((data) => {

                console.log('Success:', data);
                swal("Success", "New Ingredient Added", "success");
                setIngredients([...ingredients, { ingrediant }]);

                setName('');
                setImageUrl('');
                setCalories('');

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    };

    return (

        <Form style={{ margin: '100px' }} onSubmit={btnClick} >
            <h3>New Ingredient</h3><br />
            <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="name" value={name} onChange={(event) => setName(event.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Image Url</Form.Label>
                <Form.Control type="imageUrl" placeholder="Image Url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
            </Form.Group>


            <Form.Group className="mb-3" >
                <Form.Label>Calories</Form.Label>
                <Form.Control type="number" placeholder="calories" value={Calories} onChange={(event) => setCalories(event.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>)
}



