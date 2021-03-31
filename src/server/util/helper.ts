import axios from 'axios';
import { ArticleData } from 'src/app/interfaces/articleData';
import { LoginUser } from 'src/app/interfaces/loginUser';
import { PageData } from 'src/app/interfaces/pageData';
import { RegisterUser } from 'src/app/interfaces/registerUser';
import { TestData } from 'src/app/interfaces/test';
import { UserData } from 'src/app/interfaces/userData';
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


export async function getPage(pageName: string) {
    try {
        console.log('*** In helper call ***')
        const config = getConfig();
        const url = `${config.apiUrl}/api/v1/pages/${pageName}`
        console.log(url)
        console.log('*** calling backend api ***')
        const res = await axios.get<PageData>(url)
        console.log("DBPAASREST:",res.data)
        return res.data
    } catch (error) {
        console.log("IN ERROR BLOCK 2:", error)
        return error
    }
}
 export async function getArticles() {
    try {
        console.log('*** In helper call ***')
        const config = getConfig();
        const url = `${config.apiUrl}/api/v1/articles`
        console.log(url)
        console.log('*** calling backend api ***')
        const res = await axios.get<ArticleData[]>(url)
        console.log("DBPAASREST:",res.data)
        return res.data
    } catch (error) {
        console.log("IN ERROR BLOCK 2:", error)
        return error
    }
 }

 export async function getArticlesById(id: string) {
    try {
        console.log('*** In helper call ***')
        const config = getConfig();
        const url = `${config.apiUrl}/api/v1/articles/${id}` 
        console.log(url)
        console.log('*** calling backend api ***')
        const res = await axios.get<ArticleData>(url)
        console.log("DBPAASREST:",res.data)
        return res.data
    } catch (error) {
        console.log("IN ERROR BLOCK 2:", error)
        return error
    }
 }
 export async function registerUser(body: RegisterUser) {
    try {
        console.log('*** In helper call ***')
        const config = getConfig();
        const url = `${config.apiUrl}/api/auth/signup/` 
        console.log(url)
        console.log('*** calling backend api ***')
        const res = await axios.post<any>(url, {
            data: body
        })
        console.log("DBPAASREST:",res.data)
        return res.data
    } catch (error) {
        console.log("IN ERROR BLOCK 2:", error)
        return error
    }
}
export async function signinUser(body: LoginUser) {
    try {
        console.log('*** In helper call ***')
        const config = getConfig();
        const url = `${config.apiUrl}/api/auth/signin/` 
        console.log(url)
        console.log('*** calling backend api ***')
        const res = await axios.post<any>(url, {
            data: body
        })
        console.log("DBPAASREST:",res.data)
        return res.data
    } catch (error) {
        console.log("IN ERROR BLOCK 2:", error)
        return error
    }
}

export async function getUserById(id: string, jwt: string) {
    try {
        console.log('*** In helper call ***')
        const config = getConfig();
        const url = `${config.apiUrl}/api/user/get/${id}` 
        console.log(url)
        console.log('*** calling backend api ***')
        const res = await axios.get<UserData>(url, { headers: { 'x-access-token': jwt}})
        console.log("DBPAASREST:",res.data)
        return res.data
    } catch (error) {
        console.log("IN ERROR BLOCK 2:", error)
        return error
    }
 }