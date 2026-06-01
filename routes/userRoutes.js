import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { verifyRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get("/admin", verifyToken, verifyRole("admin"), (req, res) => {
  res.send("Welcome to the admin dashboard");
});

router.get("/manager", verifyToken, verifyRole("admin","manager"), (req, res) => {
  res.send("Welcome to the manager dashboard");
}); 

router.get("/user", verifyToken, verifyRole("admin","manager","user"), (req, res) => {
  res.send("Welcome to the user dashboard");
});

export default router;