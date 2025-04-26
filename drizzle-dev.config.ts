import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
   dialect: "sqlite",
   schema: "./db/schema.ts",
   out: "./migrations",
   dbCredentials: {  
     url: ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/339bfbbaf52ea5a4499a73f673c7ef37587b79d62cb1b0e969b6885b4304c6fc.sqlite",
   },  
}); 