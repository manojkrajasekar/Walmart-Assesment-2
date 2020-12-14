import { ApolloServer } from 'apollo-server';
import DessertSource from './datasources/desserts';
import typeDefs from './schema';
import { IResolvers } from 'graphql-tools';

const nutritionData = new DessertSource();

const resolvers: IResolvers = {
    Query: {
        desserts: () => {
            return nutritionData.getAllDesserts();
        },
        dessert: (parent, { id: dessertId }, context, info) => {
            console.log('dessertId', dessertId)
            return nutritionData.getDessertByID({ dessertId });
        },
    },
    Mutation: {
        addDessert: (_, { dessert }) => {
            console.log('dessert', dessert)
            return nutritionData.addDessert({ dessert })
        },
        deleteDessert: (_, { id: dessertId }) => {
            console.log('dessertId', dessertId)
            return nutritionData.deleteDessert({ dessertId });
        },
        deleteDesserts: (_, { dessertIds }) => {
            return nutritionData.deleteDesserts({ dessertIds });
        },
        resetData: () => {
            return nutritionData.resetData();
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/dev
    `);
});
