import express from 'express'
import cors from 'cors';

class App {
    public express

    public constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
        this.database();
    }

    private middlewares(): void {
        this.express.use(express.json())
        this.express.use(cors());
    }

    private database(): void {

    }


    private routes(): void {
        this.express.get('/', (req, res) => {
            return res.send('Hello')
        })
    }
}

export default new App().express;