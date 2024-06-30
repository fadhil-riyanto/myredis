import uuid4 from "uuid4";
import { RedisClientType } from 'redis';

interface ISessionTable {
    [key: string]: {
        redisCtx: RedisClientType | null;
        connstr: string | null;
    }
}

export class sessionTable {
    private session: ISessionTable;

    public constructor() {
        this.session = {}
    }

    public gen(redisCtx: RedisClientType, connstr: string) {
        let token: string = uuid4()

        this.session[token] = {
            redisCtx: redisCtx,
            connstr: connstr
        }

        return token
    }

    public get(token: string) {
        return this.session[token]
    }
}