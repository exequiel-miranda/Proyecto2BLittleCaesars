import express, { Router } from "express";
import employeesController from "../controllers/ReviewsController.js";
import reviewsController from "../controllers/ReviewsController.js";

//De la libreria Express utilizo Router()
//que es para colocar los metodos HTTP (get, post, put, delete)

const router = express.Router();

router.route("/")
.get(reviewsController.getReviews)
.post(reviewsController.insertReviews)


router.route("/:id")
.put(reviewsController.updateReviews)
.delete(reviewsController.deleteReviews)


export default router;