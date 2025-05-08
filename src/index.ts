import app from "./app";

import { AppDataSource } from "./config/data-source";

AppDataSource.initialize().then(() => {
  app;
});
