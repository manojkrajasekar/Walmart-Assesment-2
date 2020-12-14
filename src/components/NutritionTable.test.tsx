import {
    render,
    screen,
    cleanup,
    fireEvent,
} from '@testing-library/react';
import NutritionTable from './NutritionTable';
import StateContext from '../contexts/StateContext';
import { Dessert } from '../types';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
});

test('renders items correctly', () => {
    render(
        <BrowserRouter>
            <ApolloProvider client={client}>
                <StateContext.Provider
                    value={{
                        dispatch: () => {},
                        state: {
                            desserts: [
                                {
                                    id: '1',
                                    name: 'KitKat',
                                    calories: 518,
                                    fat: 26,
                                    carbs: 65,
                                    protein: 60,
                                } as Dessert,
                                {
                                    id: '2',
                                    name: 'Lollipop',
                                    calories: 398,
                                    fat: 2,
                                    carbs: 98,
                                    protein: 0,
                                } as Dessert,
                                {
                                    id: '3',
                                    name: 'Marshmallow',
                                    calories: 318,
                                    fat: 3,
                                    carbs: 81,
                                    protein: 2,
                                } as Dessert,
                                {
                                    id: '4',
                                    name: 'Nougat',
                                    calories: 308,
                                    fat: 19,
                                    carbs: 9,
                                    protein: 37,
                                } as Dessert,
                                {
                                    id: '5',
                                    name: 'Oreo',
                                    calories: 437,
                                    fat: 18,
                                    carbs: 63,
                                    protein: 4,
                                } as Dessert,
                            ],
                        },
                    }}
                >
                    <NutritionTable />
                </StateContext.Provider>
            </ApolloProvider>
        </BrowserRouter>
    );
    const cell = screen.getByText(/Oreo/i);
    expect(cell).toBeInTheDocument();
});

test('sorting works as expected', () => {
    const { getByTestId } = render(
        <BrowserRouter>
            <ApolloProvider client={client}>
                <StateContext.Provider
                    value={{
                        dispatch: () => {},
                        state: {
                            desserts: [
                                {
                                    id: '1',
                                    name: 'KitKat',
                                    calories: 518,
                                    fat: 26,
                                    carbs: 65,
                                    protein: 60,
                                } as Dessert,
                                {
                                    id: '2',
                                    name: 'Lollipop',
                                    calories: 398,
                                    fat: 2,
                                    carbs: 98,
                                    protein: 0,
                                } as Dessert,
                                {
                                    id: '3',
                                    name: 'Marshmallow',
                                    calories: 318,
                                    fat: 3,
                                    carbs: 81,
                                    protein: 2,
                                } as Dessert,
                                {
                                    id: '4',
                                    name: 'Nougat',
                                    calories: 308,
                                    fat: 19,
                                    carbs: 9,
                                    protein: 37,
                                } as Dessert,
                                {
                                    id: '5',
                                    name: 'Oreo',
                                    calories: 437,
                                    fat: 18,
                                    carbs: 63,
                                    protein: 4,
                                } as Dessert,
                            ],
                        },
                    }}
                >
                    <NutritionTable />
                </StateContext.Provider>
            </ApolloProvider>
        </BrowserRouter>
    );
    const carbsHeadCell = screen.getByText(/Carbs \(g\)/i);
    const tableBody = getByTestId('table-body');

    // Before Sort
    expect(tableBody.firstChild?.textContent?.includes('Lollipop')).toBe(false);
    fireEvent.click(carbsHeadCell);

    //After sort
    expect(tableBody.firstChild?.textContent?.includes('Lollipop')).toBe(true);

    //Ascending
    fireEvent.click(carbsHeadCell);
    expect(tableBody.firstChild?.textContent?.includes('Nougat')).toBe(true);
});

test('deleting works', () => {
    let desserts = [
        {
            id: '1',
            name: 'KitKat',
            calories: 518,
            fat: 26,
            carbs: 65,
            protein: 60,
        } as Dessert,
        {
            id: '2',
            name: 'Lollipop',
            calories: 398,
            fat: 2,
            carbs: 98,
            protein: 0,
        } as Dessert,
        {
            id: '3',
            name: 'Marshmallow',
            calories: 318,
            fat: 3,
            carbs: 81,
            protein: 2,
        } as Dessert,
        {
            id: '4',
            name: 'Nougat',
            calories: 308,
            fat: 19,
            carbs: 9,
            protein: 37,
        } as Dessert,
        {
            id: '5',
            name: 'Oreo',
            calories: 437,
            fat: 18,
            carbs: 63,
            protein: 4,
        } as Dessert,
    ];
    const dispatch = jest.fn((action) => {
        const dessertIds = action.payload;
        desserts = dessertIds.reduce((res: Dessert[], id: string) => {
            return res.filter((dessert) => dessert.id !== id);
        }, desserts);
    });
    const { getAllByTestId, getByTestId, rerender } = render(
        <BrowserRouter>
            <ApolloProvider client={client}>
                <StateContext.Provider
                    value={{
                        dispatch,
                        state: {
                            desserts,
                        },
                    }}
                >
                    <NutritionTable />
                </StateContext.Provider>
            </ApolloProvider>
        </BrowserRouter>
    );

    const checkboxes = getAllByTestId('selector-box');

    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);
    fireEvent.click(checkboxes[2]);

    const deleteButton = getByTestId('delete-button');
    fireEvent.click(deleteButton);

    expect(dispatch).toBeCalledWith({
        type: 'DELETE_DESSERTS',
        payload: ['1', '2', '3'],
    });

    // After delete

    rerender(
        <BrowserRouter>
            <ApolloProvider client={client}>
                <StateContext.Provider
                    value={{
                        dispatch,
                        state: {
                            desserts,
                        },
                    }}
                >
                    <NutritionTable />
                </StateContext.Provider>
            </ApolloProvider>
        </BrowserRouter>
    );
    const currentCheckboxes = getAllByTestId('selector-box');
    expect(currentCheckboxes.length).toBe(2);
});
