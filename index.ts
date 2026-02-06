import { generateData } from "./routes/generate-data";

const server = Bun.serve({
  port: 3000,
  routes: {
    "/api/generate": generateData,
  },
});

console.log(`server running on ${server.url}`);
