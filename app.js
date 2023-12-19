import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import connection from "./database/database";
import router from "./routes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors())

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

connection.connect(error => {
    if (error) throw error;
    console.log(`Successfully connected to the database.`);
  });

app.use('/', router)