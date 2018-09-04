# graphql-client

_Example Usage_
import GraphQLClient from 'graphql-client';
const schema = require('./schema.gql');

const client = new GraphQLClient(schema, {
  cacheEngine: new GraphQLClient.InMemoryStore(),
  cacheTimeInMs: 1000,
});

const users = await client.query("GetUsersByID", { id: 1 });
const user = await client.mutation("CreateUser", { firstName: "Stephen", lastName: "Baldwin" });

const addresses = await client.query({
  name: "GetUsersAddressByUserID",
  variables: {
    userID: user.id,
  },
});


const externalResult = await GraphQLClient.RawQuery("query Users { users { name } }");
