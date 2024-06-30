import { createClient } from 'redis';

export const redisConnect = async (host: string) => {
    return await createClient({url: host})
 
        .connect();

}