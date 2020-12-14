import { useContext } from 'react';
import StateContext from '../contexts/StateContext';

const useDispatch = () => {
    const { dispatch } = useContext(StateContext);
    return dispatch;
};

export default useDispatch;
