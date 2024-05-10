import express from "express";
import cors from "cors";
import { userRoutes, wagesRoutes } from "./routes";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(wagesRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
