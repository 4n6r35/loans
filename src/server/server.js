import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import AppRoutes from '../routes/appRoutes.router.js';

export class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.routes();

    }

    middlewares() {

        this.app.use(cors());

        this.app.use(express.json())

        this.app.use(express.urlencoded({ extended: true }));
    }

    routes() {
        this.app.use(AppRoutes)

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}
