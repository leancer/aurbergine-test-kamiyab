import dotenv from "dotenv";
import app from "./src/app";
import {db} from "./src/db/index"

//dot env config
dotenv.config();

//db connection
db();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});