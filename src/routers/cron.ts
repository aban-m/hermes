import { Router } from "express";

const router = Router();

router.get("/bidaily", (req, res) => {
  res.send("Bidaily");
});

export default router;
