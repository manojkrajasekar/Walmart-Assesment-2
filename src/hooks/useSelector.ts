import { useContext } from 'react';
import StateContext from '../contexts/StateContext';
import { State } from '../types';

const useSelector = <T>(selector: (state: State) => T) => {
    const { state } = useContext(StateContext);
    return selector(state);
};

export default useSelector;
