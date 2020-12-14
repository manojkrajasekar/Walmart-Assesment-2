import { gql, useMutation } from '@apollo/client';
import Button from '../components/Button';
import NutritionTable from '../components/NutritionTable';
import useDispatch from '../hooks/useDispatch';

const NutritionPage = () => {
    const [resetData] = useMutation(gql`
        mutation {
            resetData {
                message
                success
            }
        }
    `);
    const dispatch = useDispatch();
    const handleReset = async () => {
        const { errors } = await resetData();
        !errors &&
            dispatch({
                type: 'RESET_DATA',
            });
    };
    return (
        <>
            <div className="flex">
                <h1 className="f2 flex-auto">Nutrition List</h1>
                <Button className="bg-green white self-center" icon="refresh" onClick={handleReset}>
                    RESET DATA
                </Button>
            </div>
            <NutritionTable />
        </>
    );
};

export default NutritionPage;
