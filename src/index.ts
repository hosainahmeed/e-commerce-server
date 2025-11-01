import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./db/db.js";
import app from "./server.js";
const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
