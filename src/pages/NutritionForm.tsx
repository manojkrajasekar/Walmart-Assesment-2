import { gql, useMutation } from '@apollo/client';
import { InputHTMLAttributes, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import TextField from '../components/TextField';
import useDispatch from '../hooks/useDispatch';

const NutritionForm = () => {
    const [dessert, setDessert] = useState({
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
    });
    const history = useHistory();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDessert((prevState) => {
            return {
                ...prevState,
                [name]: name === 'name' ? value : parseInt(value),
            };
        });
    };

    const [addDessert] = useMutation(gql`
        mutation AddDessert(
            $name: String!
            $calories: Int!
            $fat: Int!
            $carbs: Int!
            $protein: Int!
        ) {
            addDessert(
                dessert: {
                    name: $name
                    calories: $calories
                    fat: $fat
                    carbs: $carbs
                    protein: $protein
                }
            ) {
                id
                name
                calories
                fat
                carbs
                protein
            }
        }
    `);

    const dispatch = useDispatch();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { data, errors } = await addDessert({
            variables: {
                ...dessert,
            },
        });
        if (data && !errors) {
            dispatch({
                type: 'DESSERT_ADDED',
                payload: data.addDessert,
            });
            history.push('/');
        }
    };

    return (
        <div className="bg-white pa5">
            <div className="bg-gold pa2 white b flex items-center justify-center mb4">
                <span className="material-icons-outlined">warning_</span>
                Please fill all details before you submit
            </div>
            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    label="Dessert Name"
                    name="name"
                    value={dessert.name}
                    onChange={handleChange}
                />
                <TextField
                    required
                    label="Calories"
                    name="calories"
                    value={dessert.calories}
                    type="number"
                    onChange={handleChange}
                />
                <TextField
                    required
                    label="Fat"
                    name="fat"
                    value={dessert.fat}
                    type="number"
                    onChange={handleChange}
                />
                <TextField
                    required
                    label="Carbs"
                    name="carbs"
                    value={dessert.carbs}
                    type="number"
                    onChange={handleChange}
                />
                <TextField
                    required
                    label="Protein"
                    name="protein"
                    value={dessert.protein}
                    type="number"
                    onChange={handleChange}
                />
                <Button
                    className="bg-green white w-100 justify-center"
                    icon="done"
                >
                    SUBMIT
                </Button>
            </form>
        </div>
    );
};

export default NutritionForm;
