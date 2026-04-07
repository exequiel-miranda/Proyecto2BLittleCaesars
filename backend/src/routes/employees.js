import express, { Router } from "express";
import employeesController from "../controllers/employeesController.js";

//De la libreria Express utilizo Router()
//que es para colocar los metodos HTTP (get, post, put, delete)

const router = express.Router();

router.route("/")
.get(employeesController.getEmployees)
.post(employeesController.insertEmployee)


router.route("/:id")
.put(employeesController.updateEmployee)
.delete(employeesController.deleteEmployee)


export default router;