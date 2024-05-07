
import AsyncHandler from 'express-async-handler'

import contactSchema from '../models/contactModel.js'

const getAllContact = AsyncHandler(async (req,res) => {
    
    const contact = await contactSchema.find({user_id : req.user.id})
    res.status(200).json(contact)    

})

const CreateContact = AsyncHandler(async (req,res) => {

    const {name, email , phone} = req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All The Fields are requires");
    }
    const contact = await contactSchema.create({name,email,phone,user_id :req.user.id})
    res.status(201).json({ message : "create contact"})    
}
)
const UpdateContact = AsyncHandler(async (req,res) => {
    const oneContact = await contactSchema.findById(req.params.id)
    if(!oneContact){
        res.status(404);
        throw new Error("Contact Not found")

    }
    if(oneContact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User dont have permission to update")

    }
    await contactSchema.findByIdAndUpdate(
        req.params.id,req.body,{new : true})
    res.status(200).json({ message : `Update Contact for id ${req.params.id}`})    
   
}
)
const DelContact = AsyncHandler(async (req,res) => {
    const oneContact = await contactSchema.findById(req.params.id)
    if(!oneContact){
        res.status(404);
        throw new Error("Contact Not found")

    }
    if(oneContact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User dont have permission to Delete others contacts")

    }
    
    await contactSchema.findByIdAndDelete(req.params.id)
    res.status(200).json({ message : `Delete Contact for id ${req.params.id}`} )}

)
const GetOneContact = AsyncHandler(async (req,res) => {
    const oneContact = await contactSchema.findById(req.params.id)
    if(!oneContact){
        res.status(404);
        throw new Error("Contact Not found")

    }
    if(oneContact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User dont have permission to See others contact")

    }
    res.status(200).json(oneContact)    
}
)

    export {DelContact , getAllContact , CreateContact , UpdateContact , GetOneContact}