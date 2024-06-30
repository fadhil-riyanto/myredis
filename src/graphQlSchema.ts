import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type Query {
      RedisCreateSession(connstr: String): String
      Get(ConnToken: String, key: String): String
      Getall(ConnToken: String): [String]
    }
`)