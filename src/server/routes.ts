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
}