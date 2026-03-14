import express from "express";
import subjectRouter from "./routes/subject";
import { db } from "./db";
import { departments, subjects } from "./db/schema";
import { eq, getTableColumns } from "drizzle-orm";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use("/api/subjects", subjectRouter);

app.get("/api/subjects", async (_req, res) => {
	try {
		const subjectList = await db
			.select({
				...getTableColumns(subjects),
				department: { ...getTableColumns(departments) },
			})
			.from(subjects)
			.leftJoin(departments, eq(subjects.departmentId, departments.id));

		res.status(200).json({
			data: subjectList,
			pagination: {
				total: subjectList.length,
				page: 1,
				limit: subjectList.length,
				totalPages: 1,
			},
		});
	} catch (e) {
		console.error(`GET /api/subjects error: ${e}`);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.get("/", (_req, res) => {
	res.json({ message: "Server is running" });
});

app.listen(PORT, () => {
	const url = `http://localhost:${PORT}`;
	console.log(`Server started at ${url}`);
});
