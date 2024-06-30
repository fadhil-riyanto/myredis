import express, {Request, Response} from "express";
import path from "path"
import { createHandler } from "graphql-http/lib/use/express"
import { schema } from "./graphQlSchema"
import { redisConnect } from "./operations/connect"

let redisCtx: any = null;
const preactWorkingDir = path.join(__dirname, "..", "web-interface", "dist")
const app = express()

const rootValue = {
    async RedisCreateSession({connstr}:{connstr:string}) : Promise<string | null> {
        redisCtx = await redisConnect(connstr)
        
        return await redisCtx.get("wkaka");
    },

    async Get({keys}:{keys:string}) {
        return await redisCtx.get(keys)
    }
}

app.use(express.static(preactWorkingDir))
app.get("/", (req: Request, res: Response) => {
    res.sendFile(preactWorkingDir + "/index.html")
}) 

app.all('/graphql', createHandler({ 
    schema: schema,
    rootValue: rootValue
}));

app.listen({ port: 8000 });