import express from "express";

const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/", (_req, res) => {
	res.json({ message: "Server is running" });
});

app.listen(PORT, () => {
	const url = `http://localhost:${PORT}`;
	console.log(`Server started at ${url}`);
});
