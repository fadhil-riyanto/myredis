import { createClient } from 'redis';

(async() => {
    const client = await createClient().connect();
    
    for(let i = 0; i < 100; i++) {
        console.log(await client.sendCommand(['SET', `keyof${i}`, `valof${i}`]));
    }1
})()