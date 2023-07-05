import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { handleError, notFound } from './middleware.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use(handleError);
app.use(notFound);

const PORT = process.env.PORT || 6001;

await mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

const server = app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
export default server;
