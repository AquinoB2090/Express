import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import router from './routes/carrera.routes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/carrera", router)

app.get('/', (req: Request, res: Response) => {
    res.send('Hola desde el servidor Express')
})

app.listen(PORT, () => {
    console.log('Hola desde el servidor Express, Actualizado')
})
