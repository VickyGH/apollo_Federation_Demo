const { ApolloServer } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource} = require("@apollo/gateway");


class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    request.http.headers.set('Bearer', context.bearer);
    request.http.headers.set('Orgcode', context.orgcode);
    request.http.headers.set('Partnercode', context.partnercode);
    //console.log(`🚀 Bearer ${context.bearer}`);
    //console.log(`🚀 Orgcode ${context.orgcode}`);
  }
}

const gateway = new ApolloGateway({
  serviceList: [
    //{ name: 'access',  url: 'http://localhost:8095/graphql/' },
    //{ name: 'content', url: 'http://localhost:8096/graphql/' },
    //{ name: 'payment', url: 'http://localhost:8097/graphql/' },
    //{ name: 'chatbot', url: 'https://chatbots-service.ixulabs.com/graphql' },
    //{ name: 'appointment', url: 'https://appointments-service.staging.ixulabs.com/graphql' },

    //{ name: 'article',    url: 'http://localhost:8098/graphql/' },
    //{ name: 'website',    url: 'http://localhost:8099/graphql/' },
    //{ name: 'life',    url: 'http://localhost:8100/graphql/' },
    //{ name: 'gmm',    url: 'http://localhost:8101/graphql/' },
    //{ name: 'report',    url: 'http://localhost:8102/graphql/' },
    //{ name: 'mortgage',    url: 'http://localhost:8103/graphql/' },
    //{ name: 'package',    url: 'http://localhost:8104/graphql/' },


    { name: "access",  url: "https://dommy.v2-stag.ixuapistemp.ml/graphql/" },
    { name: "content", url: "https://content.v2-stag.ixuapis.com/graphql/" },
    { name: "payment", url: "https://payments-staging.v2-stag.ixuapistemp.ml/graphql/" },
    //{ name: "website", url: "https://websites-service.staging.ixulabs.com/graphql/" },
    //{ name: "article",    url: "https://blog.staging.ixulabs.com/graphql/" },
    //{ name: "contests",url: "https://contests-service.staging.ixulabs.com/graphql/" },
    { name: "logs",    url: "https://logs-service.staging.ixulabs.com/graphql/" },
    { name: "chatbots",url: "https://chatbots-service.ixulabs.com/graphql" },
    { name: "appointment", url: "https://appointments-service.staging.ixulabs.com/graphql" },
    { name: "goal",    url: "https://goals-service.staging.ixulabs.com/graphql/" },
    { name: "cotizador-autos", url: "https://life-service.staging.ixulabs.com/graphql/" }
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
    const partnercode = req.headers.partnercode || '';
    //console.log(bearer);
    //console.log(orgcode);
    return { bearer, orgcode, partnercode};
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});