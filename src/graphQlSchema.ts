import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type DumpType {
      key: String
      value: String
      expire: String
      type: String
    }

    input Adddata {
      key: String
      value: String
      ttl: Int
    }

    type Query {
      RedisCreateSession(connstr: String): String
      Get(ConnToken: String, key: String): String
      Getall(ConnToken: String): [DumpType]
      Del(ConnToken: String, key: String): String
      Add(ConnToken: String, data: Adddata): String
    }

  

`)