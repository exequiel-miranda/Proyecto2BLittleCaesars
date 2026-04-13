/*
Campos: 
    name
    lastName
    email
    password
    birthdate
    isVerified
    loginAttemps
    timeOut
        */

import  { Schema, model} from "mongoose";


    const customerSchema = new Schema ({
             name: {type: String},
        lastName: {type: String},
        birthdate: {type: Date},
        email: {type: String},
        password: {type: String},
        isVerified: {type: String},
        loginAttemps: {type: Number},
        timeOut: {type: Date}
    }, {
        timestamps: true,
        strict : false
    })

export default model("Customer", customerSchema)