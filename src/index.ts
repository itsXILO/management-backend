import "dotenv/config";
import express from "express";
import cors from "cors";
import subjectRouter from "./routes/subject";

const app = express();
const PORT = 4000;

// CORS configuration to allow requests from the frontend
app.use(cors({
	origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true
}))

app.use(express.json());
app.use("/api/subjects", subjectRouter);

app.get("/", (_req, res) => {
	res.json({ message: "Server is running" });
});

app.listen(PORT, () => {
	const url = `http://localhost:${PORT}`;
	console.log(`Server started at ${url}`);
});
