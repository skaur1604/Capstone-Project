# New Component Plan — RecipeHub API (Milestone 1)
 
## Component Title
**Image Upload Feature using Multer**
## Purpose
The purpose of this new component is to enable users to **upload images for their recipes**.  
In the RecipeHub API, each recipe can include a picture to make the data more interactive and realistic for future frontend integration.
 
This feature demonstrates my understanding of:
- Middleware integration in Express.
- Handling file uploads with TypeScript.
- Structuring reusable modules (middleware pattern).

## Technology Used
- **Multer** — a Node.js middleware for handling `multipart/form-data` (used for uploading files).
- **TypeScript** — for strict type-checking and clean, maintainable code.
- **Express.js** — server framework for building REST APIs.
 
## Implementation Details
1. **Created a middleware file** at `src/middleware/upload.ts`:
   - Configured Multer with `diskStorage` to store files in an `uploads/` folder.
   - Customized file naming to avoid conflicts using timestamps.
   - Exported a reusable middleware function (`upload`).
 
2. **Integrated upload route** in `src/routes/recipeRoutes.ts`:
   ```ts
   router.post("/:id/upload", upload.single("image"), (req, res) => {
     res.status(200).json({
       message: "Image uploaded successfully",
       file: req.file,
     });
   });

## Milestone 2

-- Firestore Integration: Uploaded image URL is now saved in the corresponding recipe document.
-- TypeScript Compliance: Added typing for request and response objects for safer, maintainable code.
-- Error Handling: Returns proper status codes for missing files (400) and server errors (500).
-- Swagger Documentation: Added JSDoc comments for the /recipes/:id/upload endpoint, enabling interactive testing via Swagger UI.
-- Demo-Ready: Users can upload images and verify them in-browser using the URL returned in the API response.