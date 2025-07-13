import { Router } from "express";
import userController from "../controllers/user.controller";
import validation from "../core/middlewares/validation.middleware";
import { IdDto, UserCreateDto, UserFilterDto, UserUpDto } from "../dto/user.dto";
import { requirePermission } from "../core/middlewares/auth.middleware";


const router = Router();


router.get("/", requirePermission('admin'), userController.getList)
router.get("/:id", validation.paramValidationMid(IdDto), userController.findOneById);
router.post("/", requirePermission('admin'), validation.bodyValidationMid(UserCreateDto), userController.createOneByAdmin);
router.put("/:id", requirePermission('admin'), validation.paramBodyValidationMid(IdDto, UserUpDto), userController.updateOne);
router.get("/my/profile", userController.myInfo);
router.put("/my/profile", validation.bodyValidationMid(UserUpDto), userController.updateMyInfo);
router.get("/:id/block", validation.paramValidationMid(IdDto), userController.blockOne);
router.get("/:id/active", requirePermission('admin'), validation.paramValidationMid(IdDto), userController.activeOne);
router.delete("/:id", requirePermission('admin'), validation.paramValidationMid(IdDto), userController.deleteOne);
router.post("/filter/all", requirePermission('admin'), validation.bodyValidationMid(UserFilterDto), userController.filterUser)

export default router;