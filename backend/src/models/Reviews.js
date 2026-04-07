import mongoose, { Schema, model} from "mongoose";    

const reviewsSchema = new Schema({ 

    rating: {type: Number},
    comment: {type: String},
    idPizza: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pizzas"
    },
    idEmployee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employees"
    }
}, {
    timestamps: true,
    strict: false
})

export default model("Reviews", reviewsSchema)