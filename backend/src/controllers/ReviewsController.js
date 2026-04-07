const reviewsController = {}

import Reviews from "../models/Reviews.js";
import reviewsModel  from "../models/Reviews.js"

//Get 

reviewsController.getReviews = async (req, res) => {
try {
    const reviews = await reviewsModel.find();
    return res.status(200).json(reviews);
} catch (error) {
    console.log("error" + error)
    return res.status(500).json({message: "Internal Server Error"});
    }
}


//Insert
reviewsController.insertReviews = async (req, res) => {
    try {
        let {
            rating,
            comment,
            idPizza} = req.body,
            idEmployee = req.params.idEmployee;
    
            //Sanitizamos
            comment.trim();

            //Campos requeridos
            if(!rating || !comment || !idPizza || !idEmployee){
                return res.status(400).json({message: "Field required"})
            }
            //Logitud del comentario
            if(comment.leght < 5 || comment.leght > 400){
                return res.status(400).json({message: "Invalid comment"})
            }    
            //Validar rating
            if(rating < 1 || rating > 5){
                return res.status(400).json({message: "Invalid rating"})
            }

            const newReview = new reviewsModel({
                rating,
                comment,
                idPizza,
                idEmployee
            });

    await newReview.save()

    return res.status(201).json({message: "Review saved"})
    } catch (error) {
          console.log("error" + error)
    return res.status(500).json({message: "Internal Server Error"});
    }
}


//DELETE

reviewsController.deleteReviews = async (req, res) => {
  try {
    const deleteReviews = await reviewsModel.findByIdAndDelete(req.params.id);
    if(!deleteReviews){
                return res.status(404).json({message: "Review not found"})
    }
    return res.status(200).json({message: "Review deleted"})
  } catch (error) {
      console.log("error" + error)
    return res.status(500).json({message: "Internal server error"})
  }
}

//UPDATE

reviewsController.updateReviews = async (req, res) => {
    try {
        let {
            rating,
            comment,
            idPizza,
            idEmployee
        } = req.body;

        comment.trim();
       //Campos requeridos
            if(!rating || !comment || !idPizza || !idEmployee){
                return res.status(400).json({message: "Field required"})
            }
            //Logitud del comentario
            if(comment.leght < 5 || comment.leght > 400){
                return res.status(400).json({message: "Invalid comment"})
            }    
            //Validar rating
            if(rating < 1 || rating > 5){
                return res.status(400).json({message: "Invalid rating"})
            }

            const reviewUpdated = await reviewsModel.findByIdAndUpdate(req.params.id, {
                rating,
                comment,
                idPizza,
                idEmployee
            }, {new: true});

     if (!reviewUpdated){
        return res.status(404).json({message: "Review not found"})
     }
     return res.status(200).json({message: "Review updated"})

    } catch (error) {
         console.log("error"+error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default reviewsController;