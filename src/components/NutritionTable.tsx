import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useDispatch from '../hooks/useDispatch';
import useSelector from '../hooks/useSelector';
import { DessertKeys } from '../types';
import Button from './Button';

interface SortState {
    on: DessertKeys;
    direction: 'asc' | 'desc';
}

const NutritionTable = () => {
    const desserts = useSelector((state) => state.desserts);
    const [selected, setSelected] = useState<{ [key: string]: boolean }>({});
    const [sort, setSort] = useState<SortState>({
        on: 'name',
        direction: 'asc',
    });

    const [deleteDesserts] = useMutation(gql`
        mutation DeleteDesserts($dessertIds: [ID]!) {
            deleteDesserts(dessertIds: $dessertIds) {
                message
                success
            }
        }
    `);

    const handleSort = (on: DessertKeys) => {
        setSort((prevState) => {
            return {
                on,
                direction: prevState.direction === 'asc' ? 'desc' : 'asc',
            };
        });
    };

    const dispatch = useDispatch();

    const handleDelete = async () => {
        const dessertIds = Object.keys(selected);
        try {
            dispatch({
                type: 'DELETE_DESSERTS',
                payload: dessertIds,
            });
            const { data, errors } = await deleteDesserts({
                variables: { dessertIds },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const sortedList = desserts
        .slice()
        .sort((a, b) =>
            a[sort.on] > b[sort.on]
                ? sort.direction === 'asc'
                    ? 1
                    : -1
                : sort.direction === 'asc'
                ? -1
                : 1
        );

    const noOfSelected = Object.keys(selected).filter((key) => selected[key])
        .length;


    return (
        <>
            <div className="pv3 ph2 bg-washed-red flex">
                <p className="hot-pink b flex-auto">{noOfSelected} selected</p>
                <Link to="/add" className="no-underline">
                    <Button className="bg-white green mh1" icon="add">
                        ADD NEW
                    </Button>
                </Link>
                <Button
                    className="bg-white red mh1"
                    icon="delete"
                    disabled={!noOfSelected}
                    onClick={handleDelete}
                    data-testid="delete-button"
                >
                    DELETE
                </Button>
            </div>
            <table className="w-100" cellSpacing={0}>
                <thead>
                    <tr className="bg-white pointer">
                        <th className="fw6 bb b--black-20 pt3 pb3 pr3 tc">
                            <input
                                className="mr2"
                                type="checkbox"
                                value="selectAll"
                                checked={
                                    Object.keys(selected).every(
                                        (key) => selected[key]
                                    ) &&
                                    Object.keys(selected).length ===
                                        desserts.length
                                }
                                onChange={(event) => {
                                    setSelected(() => {
                                        return desserts.reduce(
                                            (res, dessert) => ({
                                                ...res,
                                                [dessert.id
                                                    ? dessert.id
                                                    : '']: event.target.checked,
                                            }),
                                            {}
                                        );
                                    });
                                }}
                            />
                        </th>
                        <th
                            className="fw6 bb b--black-20 pt3 pb3 pr3 tc"
                            onClick={() => handleSort('name')}
                        >
                            <span className="flex items-center justify-center">
                                Dessert (100g serving){' '}
                                <span className="material-icons">
                                    import_export
                                </span>
                            </span>
                        </th>
                        <th
                            className="fw6 bb b--black-20 pt3 pb3 pr3 tc"
                            onClick={() => handleSort('calories')}
                        >
                            <span className="flex items-center justify-center">
                                Calories{' '}
                                <span className="material-icons">
                                    import_export
                                </span>
                            </span>
                        </th>
                        <th
                            className="fw6 bb b--black-20 pt3 pb3 pr3 tc"
                            onClick={() => handleSort('fat')}
                        >
                            <span className="flex items-center justify-center">
                                Fat (g){' '}
                                <span className="material-icons">
                                    import_export
                                </span>
                            </span>
                        </th>
                        <th
                            className="fw6 bb b--black-20 pt3 pb3 pr3 tc"
                            onClick={() => handleSort('carbs')}
                        >
                            <span className="flex items-center justify-center">
                                Carbs (g){' '}
                                <span className="material-icons">
                                    import_export
                                </span>
                            </span>
                        </th>
                        <th
                            className="fw6 bb b--black-20 pt3 pb3 pr3 tc"
                            onClick={() => handleSort('protein')}
                        >
                            <span className="flex items-center justify-center">
                                Protein (g){' '}
                                <span className="material-icons">
                                    import_export
                                </span>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody className="lh-copy" data-testid="table-body">
                    {sortedList.map((dessert) => (
                        <tr key={dessert.id}>
                            <td className="pv3 pr3 bb b--black-20 tc">
                                <input
                                    data-testid="selector-box"
                                    className="mr2"
                                    type="checkbox"
                                    value={dessert.id}
                                    checked={
                                        !!selected[dessert.id ? dessert.id : '']
                                    }
                                    onChange={(event) => {
                                        setSelected(() => {
                                            return {
                                                ...selected,
                                                [dessert.id
                                                    ? dessert.id
                                                    : '']: event.target.checked,
                                            };
                                        });
                                    }}
                                />
                            </td>
                            <td className="pv3 pr3 bb b--black-20 tc">
                                {dessert.name}
                            </td>
                            <td className="pv3 pr3 bb b--black-20 tc">
                                {dessert.calories}
                            </td>
                            <td className="pv3 pr3 bb b--black-20 tc">
                                {dessert.fat}
                            </td>
                            <td className="pv3 pr3 bb b--black-20 tc">
                                {dessert.carbs}
                            </td>
                            <td className="pv3 pr3 bb b--black-20 tc">
                                {dessert.protein}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default NutritionTable;
