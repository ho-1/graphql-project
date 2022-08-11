const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String,
    ho: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
  ho: () => {
    return 'ggg';
  },
};

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
