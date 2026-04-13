import customersModel from "../models/customers.js";

const customersModel = {

}
//SELECT
customerController.getCustomers = async (req,res) => {
    try {
        const customers = await customersModel.find();
        return res.status(200).json(customers)

    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal server error"})
    }
}
//UPDATE
customerController.updateCustomers = async (req,res) => {
    try {
        //Solicitar los datos nuevos
        let {
            name,
            lastName,
            birthdate,
            email,
            password,
            isVerified
} = req.body;
    //VALIDACIONES 
    //sanitizar
    name = name?.trim();
    email = email?.trim();


    //validar campos required
    if(!name || !email || !password){
        return res.status(400).json({message: "Fields required"})
    }

    //Longitud de caracteres
    if(name.length < 3 || name.length > 15){
        return res.status(400).json({message: "Insert a valid name"})
    }
//ACTUALIZAMOS
const customerUpdated = await customersModel.findByIdAndUpdate(req.params.id,{
      name,
            lastName,
            birthdate,
            email,
            password,
            isVerified
},
    {new: true},
);

if(!customerUpdated){
    return res.status(404).json({message: "Customer not found"})
}

return res.status(200).json({message: "Customer Updated"})
    } catch (error) {
          console.log("error"+error)
        return res.status(500).json({message: "Internal server error"})
    }
}

// ELIMINAR
customerController.deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = customersModel.findByIdAndDelete(req.params.id);

        if(!deletedCustomer){
            return res.status(404).json({message: "Customer not found"})
  
        }
         return res.status(200).json({message: "Customer deleted" })
    } catch (error) {
           console.log("error"+error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default customerController;