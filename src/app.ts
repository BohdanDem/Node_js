import express from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";

const app = express();
const fsService = require('./fs.service')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req, res)=> {
  const users = await fsService.reader()
  res.json(users)
})

const PORT = 5000;

app.listen(PORT, async () => {
  await mongoose.connect(configs.DB_URI);
  console.log(`Server has successfully started on PORT ${PORT}`);
});
