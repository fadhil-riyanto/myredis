import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type Query {
      RedisCreateSession(connstr: String): String
      Get(keys: String): String
    }
`)