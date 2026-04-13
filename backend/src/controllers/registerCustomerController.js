import nodemailer from "nodemailer" //Enviar correos
import crypto from "crypto" //Genera codigo aleatorio
import jsonwebtoken from "jsonwebtoken" //Token
import bcryptjs from "bcryptjs" //Encriptar contraseña
import customerModel from "../models/customers.js"
import {config} from "../../config.js"

//array de funciones
const registerCustomerController = {};
registerCustomerController.register = async (req, res) => {
    try {
        //Solicitar los datos a guardar 
        const {name, lastName, birthdate, email, password, isVerified, loginAttemps, timeOut,
        } = req.body;
      //Validar si el correo existe en la base de datos
        const existCustomer = await customerModel.findOne({email})
        if(existsCustomer){
          return res.status(400).json({message: "Customer already exists"})   
        }

        //Encriptar contraseña
 const passwordHashed = await bcryptjs.hash(password, 10)
        //Generar un codigo aleatorio
 const randomCode = crypto.randomBytes(3).toString("hex")

        //Guardamos todo en un token
  const token = jsonwebtoken.sign(
    //#1 ¿Que vamos a guardar?
    {randomCode,name, lastName, birthdate, email, password: passwordHashed, isVerified, loginAttemps, timeOut,},
    //#2 Secret key
    config.JWT.secret,
    //#3 ¿Cuando expira mi token?
    {expiresIn: "15m"}
  );

  //guardamos el token en una cookie
  res.cookie("registrartionCookie", token,{maxAge: 15 * 60 * 1000})

} catch (error) {
        
    }
}

