import { createClient } from 'redis';

(async() => {
    const client = await createClient().connect();
    console.log(await client.sendCommand(['KEYS', '*']));
})()