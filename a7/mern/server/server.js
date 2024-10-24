import cors from "cors";
import express from "express";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

// start the Express server
//node --env-file=config.env server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});