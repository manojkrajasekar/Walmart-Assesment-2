import { gql } from 'apollo-server';

const typeDefs = gql`
    type Dessert {
        id: ID!
        name: String
        calories: Int
        fat: Int
        carbs: Int
        protein: Int
    }

    input DessertInput {
        name: String
        calories: Int
        fat: Int
        carbs: Int
        protein: Int
    }

    type Query {
        desserts: [Dessert]!
        dessert(id: ID!): Dessert
    }

    type ResetDataResponse {
        success: Boolean!
        message: String
    }

    type Mutation {
        addDessert(dessert: DessertInput): Dessert
        deleteDessert(id: ID!): Dessert!
        deleteDesserts(dessertIds: [ID]!): ResetDataResponse!
        resetData: ResetDataResponse
    }
`;

export default typeDefs;
