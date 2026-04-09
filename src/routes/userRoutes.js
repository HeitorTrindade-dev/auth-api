import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("auth/register", userController.register);
router.post("auth/login", (req, res) => userController.login(req, res));
router.get("auth/protected", authMiddleware, (req, res) => {
  res.json({ message: "Authenticated", userId: req.userId });
});

export default router;
