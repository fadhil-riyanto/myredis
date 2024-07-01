import express, {Request, Response} from "express";
import path from "path"
import { createHandler } from "graphql-http/lib/use/express"

import { schema } from "./graphQlSchema"
import { redisConnect } from "./operations/connect"
import { sessionTable } from "./SessionTable"
import { RedisClientType } from 'redis';
import { AddBySec } from "./utils";
import { DumpType } from "./type"
import date from 'date-and-time';

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

    async Getall({ConnToken}:{ConnToken:string, key: string}): Promise<DumpType[] | undefined> {
        let allkeys: string[] | undefined = await session.get(ConnToken).redisCtx?.sendCommand(['KEYS', '*'])

        let data = allkeys?.map(async (key: string): Promise<DumpType> => {
            let ttl: number | undefined = await session.get(ConnToken).redisCtx?.sendCommand(["TTL", key]);
            console.log(ttl!)
            return {
                key: key,
                value: await session.get(ConnToken).redisCtx?.get(key),
                expire: ttl! < 0 ? "no expiration" : date.format(AddBySec(ttl! < 0 ? 0 : ttl!), "HH:mm:ss"),
                type: await session.get(ConnToken).redisCtx?.sendCommand(["TYPE", key])!

            }
        })

        let realdata = await Promise.all(<Promise<DumpType>[]>data)

        console.log(realdata)
        // let mapped: DumpType[] = await Promise.all(allkeys?.map((a:string): Promise<string> => {
        //     return a;
        // }))
        return realdata
         
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