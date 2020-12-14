import { ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery } from '@apollo/client';
import { useEffect, useReducer } from 'react';
import StateContext from './contexts/StateContext';
import useDispatch from './hooks/useDispatch';
import { Action, State, Dessert } from './types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NutritionPage from './pages/NutritionPage';
import NutritionForm from './pages/NutritionForm';

function Main() {
    const { error, data } = useQuery<{
        desserts: Array<Dessert>;
    }>(gql`
        query Desserts {
            desserts {
                id
                name
                calories
                fat
                protein
                carbs
            }
        }
    `);

    const dispatch = useDispatch();

    useEffect(() => {
        if (data && !error) {
            dispatch({
                type: 'DATA_RECEIVED',
                payload: data.desserts,
            });
        }
    }, [data, error, dispatch]);

    return (
        <main className="ml-auto mr-auto pl3 pr3 pt4 bg-near-white min-vh-100">
            <div className="w-80 center">
                <Router>
                    <Route path="/" exact component={NutritionPage} />
                    <Route path="/add" exact component={NutritionForm} />
                </Router>
            </div>
        </main>
    );
}

const initialState: State = {
    desserts: [],
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'DATA_RECEIVED': {
            const desserts = action.payload;
            return { ...state, desserts };
        }
        case 'DESSERT_ADDED': {
            const dessert = action.payload;
            const desserts = [...state.desserts, dessert];
            return { ...state, desserts };
        }
        case 'DELETE_DESSERTS': {
            const dessertIds = action.payload;
            const desserts = dessertIds.reduce((res: Dessert[], id: string) => {
                return res.filter((dessert) => dessert.id !== id);
            }, state.desserts);
            return { ...state, desserts };
        }
        case 'RESET_DATA': {
            return { desserts: [] };
        }
        default:
            return state;
    }
};

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
});

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <ApolloProvider client={client}>
            <StateContext.Provider value={{ state, dispatch }}>
                <Main />
            </StateContext.Provider>
        </ApolloProvider>
    );
};

export default App;
