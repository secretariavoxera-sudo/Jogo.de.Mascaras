// server/index.ts
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
async function startServer() {
  const app = express();
  const server = createServer(app);
  const staticPath = process.env.NODE_ENV === "production" ? __dirname : path.resolve(__dirname, "..", "dist");
  app.use("/Jogo_de_Mascaras", express.static(staticPath));
  app.get("/Jogo_de_Mascaras*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
  app.get("/", (_req, res) => {
    res.redirect("/Jogo_de_Mascaras/");
  });
  const port = process.env.PORT || 3e3;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
