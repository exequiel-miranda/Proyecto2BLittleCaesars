import express from "express";
import branchescpntoller from "../controllers/branchesController.js";
import { validateAuthCookie } from "../middlewares/authMiddleware.js";

//Router() nos ayuda a colocar los métodos
//que vamos a usar
const router = express.Router();

router
  .route("/")
  .get( branchescpntoller.getbranches)
  .post(branchescpntoller.insertBranches);



router
  .route("/:id")
  .put(branchescpntoller.updateBranches)
  .delete(validateAuthCookie(["admin"]),branchescpntoller.deleteBranches);

export default router;
