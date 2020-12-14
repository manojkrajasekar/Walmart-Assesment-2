const INITIAL_STATE = [
    {
        id: '1',
        name: 'KitKat',
        calories: 518,
        fat: 26,
        carbs: 65,
        protein: 60,
    },
    {
        id: '2',
        name: 'Lollipop',
        calories: 398,
        fat: 2,
        carbs: 98,
        protein: 0,
    },
    {
        id: '3',
        name: 'Marshmallow',
        calories: 318,
        fat: 3,
        carbs: 81,
        protein: 2,
    },
    {
        id: '4',
        name: 'Nougat',
        calories: 308,
        fat: 19,
        carbs: 9,
        protein: 37,
    },
    {
        id: '5',
        name: 'Oreo',
        calories: 437,
        fat: 18,
        carbs: 63,
        protein: 4,
    },
];

class DessertSource {
    data = [];
    static ID = 5;

    constructor() {
        this.data = INITIAL_STATE;
    }

    getAllDesserts() {
        return this.data;
    }

    getDessertByID({ dessertId }: { dessertId: string }) {
        return this.data.find((dessert) => {
            return dessert.id === dessertId;
        });
    }

    addDessert({ dessert }: {
        dessert: {
            name: string;
            calories: number;
            fat: number;
            carbs: number;
            protein: number;
        };
    }) {
        DessertSource.ID += 1
        const id = DessertSource.ID.toString();
        this.data.push({ id, ...dessert });
        return { id, ...dessert };
    }

    deleteDessert({ dessertId }: { dessertId: string }) {
        console.log('dessertId', dessertId);
        const deletedDessert = this.data.find((dessert) => {
            return dessert.id === dessertId;
        });
        console.log('deletedDessert', deletedDessert);

        const newData = this.data.filter((dessert) => dessert.id !== dessertId);
        this.data = newData;
        return deletedDessert;
    }

    deleteDesserts({ dessertIds }: { dessertIds: number[] }) {
        dessertIds.map((dessertId) => {
            const newData = this.data.filter(
                (dessert) => dessert.id !== dessertId
            );
            this.data = newData;
        });

        return {
            success: true,
            message: 'Desserts have been deleted',
        };
    }

    resetData() {
        this.data = [];
        return {
            success: true,
            message: 'All data has been reset',
        };
    }
}

export default DessertSource;
