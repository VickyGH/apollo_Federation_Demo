const { ApolloServer } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource} = require("@apollo/gateway");


class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    request.http.headers.set('Bearer', context.bearer);
    request.http.headers.set('Orgcode', context.orgcode);
  }
}

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'access', url: 'http://localhost:8095/graphql/' },
    //{ name: 'access', url: 'https://apapacho.staging.ixuapistemp.ml/graphql/'},
    { name: 'content', url: 'http://localhost:8096/graphql/' },
    //{ name: 'payment', url: 'http://localhost:8097/graphql/' },
  ],
   buildService({ name, url }) {
    return new AuthenticatedDataSource({ url });
  },
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req }) => {
    const bearer = req.headers.authorization || '';
    const orgcode = req.headers.orgcode || '';
    console.log(bearer: ${bearer});
    return { bearer };
  },
});

server.listen().then(({ url }) => {
  console.log(🚀 Server ready at ${url});
});