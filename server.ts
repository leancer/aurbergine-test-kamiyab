import dotenv from "dotenv";
import app from "./src/app";

//dot env config
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});