import { createClient } from 'redis';

interface Addtype {
    key: string
    value: string
}



(async() => {
    const client = await createClient().connect();

    async function AddData(data: Addtype) {
        await client.set(data.key, data.value)
    }
    
    
})()