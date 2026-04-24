import express from "express";
import cors from "cors";
import policyRoutes from "./modules/policy/policy.routes";
import { initDefaultData } from "../../../packages/ai/src/initDefaultData";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/policy", policyRoutes);

// 🔥 IMPORTANT: load default data before server starts
(async () => {
  await initDefaultData();

  app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
  });
})();