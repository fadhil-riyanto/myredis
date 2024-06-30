import express, {Request, Response} from "express";
import path from "path"
import { createHandler } from "graphql-http/lib/use/express"

import { schema } from "./graphQlSchema"
import { redisConnect } from "./operations/connect"
import { sessionTable } from "./SessionTable"
import { RedisClientType } from 'redis';

const preactWorkingDir = path.join(__dirname, "..", "web-interface", "dist")
const app = express()
const session = new sessionTable()

const rootValue = {
    async RedisCreateSession({connstr}:{connstr:string}) : Promise<string | null> {
        let redisCtx: any = await redisConnect(connstr)
        
        return session.gen(redisCtx, connstr)
    },

    async Get({ConnToken, key}:{ConnToken:string, key: string}) {
        return session.get(ConnToken).redisCtx?.get(key)
    },

    async Getall({ConnToken}:{ConnToken:string, key: string}): Promise<string[] | undefined> {
        return await session.get(ConnToken).redisCtx?.sendCommand(['KEYS', '*'])
    }
}

app.use(express.static(preactWorkingDir))
app.get("/", (req: Request, res: Response) => {
    res.sendFile(preactWorkingDir + "/index.html")
}) 

app.all('/graphql', (req: Request, res: Response, next: any) => {
        res.header("Access-Control-Allow-Origin", "*");
        next()
    }, createHandler({ 
        schema: schema,
        rootValue: rootValue
    })
);

app.listen({ port: 8000 });