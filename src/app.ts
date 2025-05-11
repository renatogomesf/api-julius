import express from "express";
import cors from "cors";
import router from "./routes";
import 'dotenv/config'

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

app.listen(Number(process.env.SERVER_PORT), process.env.SERVER_HOST, () => {
  console.log(
    `Servidor rodando em http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
  );
});

export default app;
