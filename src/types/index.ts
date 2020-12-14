export type DessertKeys = 'name' | 'calories' | 'fat' | 'carbs' | 'protein';

export type Dessert = {
    [key in DessertKeys]: number;
} & {
    name: string;
    id?: string;
};

export interface State {
    desserts: Array<Dessert>;
}

export interface Action {
    type: string;
    payload?: any;
}
