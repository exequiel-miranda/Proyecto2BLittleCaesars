const employeesController = {};

// Importo el Schema que voy a utilizar
import employeesModel from "../models/employees.js"

//Get
employeesController.getEmployees = async (req, res) => {
    try {
        const employees = await employeesModel.find();
        return res.status(200).json(employees);
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }           
}  



//Insert
employeesController.insertEmployee = async (req, res) =>{
    try {
        
    // Solicitamos los datos a guardar
    let {
        name,
        lastName,
        DUI,
        birthdate,
        email,
        password,
        isVerified,
        status,
        idBranches} = req.body;
    
        //Validaciones
        //Sanitizar
        name =  name?.trim();
        email = email?.trim();
        password = password?.trim();
        
        //campos requeridos
        if(!name || !email || !password){
             return res.status(400).json({message: "Field required"})
        }
        
        //Longitud de caracteres
        if(name.legth < 3 || name.legth > 20){
             return res.status(400).json({message: "name must be real"})
        }
        //Validacion de fechas
        if(birthdate > new Date || birthdate < new Date("1910-01-01") ){
             return res.status(400).json({message: "Invalid date"})
        }

        //Validar el Dui
        if(DUI.length > 10 || DUI.length < 9){
            return res.status(400).json({message: "Invalid DUI"})
        }

        const newEmployee = new employeesModel({
            name,
            lastName,
            DUI,
            birthdate,
            email,
            password,
            isVerified,
            status, 
            idBranches
        });

        await newEmployee.save();

        return res.status(201).json({message: "Employee saved"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
};

//DELETE 

employeesController.deleteEmployee = async (req, res) => {
    try {
    const deleteEmployee = await employeesModel.findByIdAndDelete(req.params.id)
        if(!deleteEmployee){
        return res.status(404).json({message: "Employee not found"})
    }

    return res.status(200).json({message: "Employee deleted"})

} catch (error) {
    console.log("error" + error)
    return res.status(500).json({message: "Internal server error"})
   }    
}

//UPDATE
employeesController.updateEmployee = async (req, res) => {
    try {
        //Solicitamos los nuevos datos
        let{
            name,
            lastName,
            DUI,
            birthdate,
            email,
            password,
            isVerified,
            status,
            idBranches
        } = req.body;
    
        //Validaciones
        //Sanitizar
        name =  name?.trim();
        email = email?.trim();
        password = password?.trim();
        
        //campos requeridos
        if(!name || !email || !password){
             return res.status(400).json({message: "Field required"})
        }
        
        //Longitud de caracteres
        if(name.legth < 3 || name.legth > 20){
             return res.status(400).json({message: "name must be real"})
        }
        //Validacion de fechas
        if(birthdate > new Date || birthdate < new Date("1910-01-01") ){
             return res.status(400).json({message: "Invalid date"})
        }

        //Validar el Dui
        if(DUI.length > 10 || DUI.length < 9){
            return res.status(400).json({message: "Invalid DUI"})
        }

        const employeeUpdated = await employeesModel.findByIdAndUpdate(req.params.id, {
            name,
            lastName,
            DUI,
            birthdate,
            email,
            password,
            isVerified,
            status, 
            idBranches,}, {new: true}
        );

        if(!employeeUpdated)
        {
            return res.status(404).json({message: "employee not found"})
        }

        return res.status(200).json({message: "Employee updated"})
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal server error"})
    }
};

export default employeesController;