import express from "express";
import cors from "cors";
import policyRoutes from "./modules/policy/policy.routes";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
// routes
app.use("/api/policy", policyRoutes);

// health check
app.get("/", (req, res) => {
  res.send("API running");
});

export default app;