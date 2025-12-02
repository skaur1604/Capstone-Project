import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
definition: {
	openapi: "3.0.0",
	info: {
	title: "RecipeHub API",
	version: "1.0.0",
	description: "API for managing recipes",
	},
	servers: [{ url: "http://localhost:3000" }],
},
apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;

/**
 * @swagger
 * /recipes/filter:
 *   get:
 *     summary: Filter, sort, search, and paginate recipes
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: query
 *         name: category
 *       - in: query
 *         name: minRating
 *       - in: query
 *         name: search
 *       - in: query
 *         name: sortBy
 *       - in: query
 *         name: order
 *       - in: query
 *         name: page
 *       - in: query
 *         name: limit
 *     responses:
 *       200:
 *         description: Filtered recipe results
 */


