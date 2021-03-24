import axios from 'axios';
import { TestData } from 'src/app/interfaces/test';
const config = require('../../config/config.json');

export function getConfig(){
    const env = process.env.APP_ENV || 'local'
    console.log(env)
    return config[env]
}
export async function test() {
    try {
        console.log('*** In helper call ***')
        const config = getConfig();
        const url = `${config.apiUrl}/api/v1/test`
        console.log(url)
        console.log('*** calling backend api ***')
        const res = await axios.get<TestData>(url)
        console.log("DBPAASREST:",res.data)
        return res.data.message
    } catch (error) {
        console.log("IN ERROR BLOCK 2:", error)
        return error
    }
}