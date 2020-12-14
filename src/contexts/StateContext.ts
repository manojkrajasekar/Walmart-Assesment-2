import { createContext } from 'react';
import { Action, State } from '../types';

const StateContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({ state: { desserts: [] }, dispatch: (a: Action) => {} });

export default StateContext;
