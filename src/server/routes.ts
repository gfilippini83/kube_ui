import * as helpers from './util/helper';
import * as express from 'express';

export function routes (server: express.Express) {
    server.get('/api/test', async (req, res) => {
        try{
            console.log("*** In api call ***")
            var resp = await helpers.test();
            console.log("*** completed helpers call ***")
            res.send({message: "IN SERVER SIDE API --> " + resp })
        } catch (error) {
            console.log("IN ERROR BLOCK 1:", error)
        }
    })

    server.get('/api/pages/:pageName', async (req, res) => {
        try{
            const pageName = req.params.pageName
            console.log("*** In api call ***")
            var resp = await helpers.getPage(pageName);
            console.log("*** completed helpers call ***")
            res.send(resp)
        } catch (error) {
            console.log("IN ERROR BLOCK 1:", error)
        }
    })

    server.get('/api/articles', async (req, res) => {
        try{
            console.log("*** In api call ***")
            var resp = await helpers.getArticles();
            console.log("*** completed helpers call ***")
            res.send(resp)
        } catch (error) {
            console.log("IN ERROR BLOCK 1:", error)
        }
    })

    server.get('/api/articles/:id', async (req, res) => {
        try{
            const id = req.params.id
            console.log("*** In api call ***")
            var resp = await helpers.getArticlesById(id);
            console.log("*** completed helpers call ***")
            res.send(resp)
        } catch (error) {
            console.log("IN ERROR BLOCK 1:", error)
        }
    })
    server.get('/api/user/get/:id', async (req, res) => {
        try{
            const id = req.params.id
            console.log(req)
            const jwt = <string> req.query.jwt
            console.log("*** In api call ***")
            var resp = await helpers.getUserById(id, jwt);
            console.log("*** completed helpers call ***")
            res.send(resp)
        } catch (error) {
            console.log("IN ERROR BLOCK 1:", error)
        }
    })
    server.post('/api/auth/signup', async (req, res) => {
        try{
            const body = req.body
            console.log(body)
            console.log("*** In api call ***")
            var resp = await helpers.registerUser(body);
            console.log("*** completed helpers call ***")
            res.send(resp)
        } catch (error) {
            console.log("IN ERROR BLOCK 1:", error)
        }
    })
    server.post('/api/auth/signin', async (req, res) => {
        try{
            const body = req.body
            console.log(body)
            console.log("*** In api call ***")
            var resp = await helpers.signinUser(body);
            console.log("*** completed helpers call ***")
            res.send(resp)
        } catch (error) {
            console.log("IN ERROR BLOCK 1:", error)
        }
    })
}