import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getSwaggerSpec() {
  if (process.env.NODE_ENV !== "development") {
    return null; 
  }

  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Task Manager API",
        version: "1.0.0",
        description: "API documentation for the task manager backend",
      },
      servers: [
        { url: "http://localhost:3000" },
      ],
    },
    apis: [
      path.join(__dirname, "../routes/auth.js"),
      path.join(__dirname, "../routes/tasks.js"),
    ],
  };

  return swaggerJSDoc(options);
}
