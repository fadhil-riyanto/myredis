
export interface DumpType {
    key: string;
    value: string | null | undefined;
    expire: string;
    type: any

}

// export type RedisCommandArgument = string | Buffer;

export interface Addtype {
    key: string | Buffer
    value: string
    ttl: number
}