import express from "express";

import cors from "cors";

import router from "./routes";

const app = express();

app.use(express.json());

app.use(cors());

app.use(router)

app.listen(3000, "localhost", () => {
  console.log("rodando em http://localhost:3000");
});

export default app