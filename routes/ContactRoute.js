import express from "express";
import {DelContact ,getAllContact , CreateContact , UpdateContact  , GetOneContact} from '../controllers/contactController.js'
import validateToken from "../middleware/validateToken.js";
const router = express.Router()

router.use(validateToken)

router.route("/")
.get(getAllContact)
.post(CreateContact)

router.route("/:id")
.put(UpdateContact)
.delete(DelContact)
.get(GetOneContact)


export default router