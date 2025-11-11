import express from "express";
import cors from "cors";
import helmet from "helmet";
import recipeRoutes from "./routes/recipeRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/recipes", recipeRoutes);

app.get("/", (req, res) => {
res.json({ message: "RecipeHub API is running" });
});

export default app;
