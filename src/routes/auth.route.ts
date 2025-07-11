import { Router } from "express";
import authController from "../controllers/auth.controller";
import { RegisterDto, LoginDto } from "../dto/user.dto";
import validation from "../core/middlewares/validation.middleware";


const router = Router();


router.post("/register", validation.bodyValidationMid(RegisterDto), authController.register)
router.post("/login", validation.bodyValidationMid(LoginDto), authController.login)

export default router;