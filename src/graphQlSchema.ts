import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type DumpType {
      key: String
      value: String
      expire: String
      type: String
    }
    type Query {
      RedisCreateSession(connstr: String): String
      Get(ConnToken: String, key: String): String
      Getall(ConnToken: String): [DumpType]
    }

  

`)