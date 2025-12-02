import request from "supertest";
import app from "../app";

jest.mock("../middleware/auth", () => ({
  authMiddleware: (req: { user: { uid: string; role: string; }; }, res: any, next: () => void) => {
    req.user = { uid: "test-user", role: "user" };  
    next();
  },
}));

describe("Recipe routes", () => {
it("should create a recipe", async () => {
	const res = await request(app).post("/recipes").send({
	title: "Test Recipe",
	description: "Delicious test recipe",
	});
	expect(res.statusCode).toBe(201);
	expect(res.body.title).toBe("Test Recipe");
});

it("should get all recipes", async () => {
	const res = await request(app).get("/recipes");
	expect(res.statusCode).toBe(200);
	expect(Array.isArray(res.body)).toBe(true);
});
});

describe("GET /recipes/filter", () => {
  it("returns filtered recipes", async () => {
    const res = await request(app).get("/recipes/filter?category=Breakfast");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("results");
  });
});
