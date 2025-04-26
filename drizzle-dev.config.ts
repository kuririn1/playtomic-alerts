import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
   dialect: "sqlite",
   schema: "./db/schema.ts",
   out: "./migrations",
   dbCredentials: {  
     url: ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/79f9dea53034f827f366e862f0f72ce14e8a2c367757b212327495ba2a0e019b.sqlite",
   },  
}); 