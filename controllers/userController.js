import AsyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import usermodel from '../models/usermodel.js';
import jwt from 'jsonwebtoken';


const registerUser = AsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are required")
    }

    const userAvailable = await usermodel.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error("User mail exists")
    }

    const hashpassword = await bcrypt.hash(password, 10)

    const User = await usermodel.create({ username, email, password: hashpassword })
    if (User) {
        res.status(201).json({ _id: User.id, email: User.email })
    } else {
        res.status(400);
        throw new Error("data not valid")
    }
    res.json({ Message: "Register a user" })
});

const loginUser = AsyncHandler(async (req, res) => {
    const {email , password } =  req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are required")
    }
    const user = await usermodel.findOne({ email });
    if(user && (await bcrypt.compare(password , user.password))){
        const accessToken = jwt.sign(
            {
                user : {
                    username : user.username,
                    email : user.email,
                    id : user.id
                },
            },
            process.env.ACCESS_TOKEN_SECRET, {expiresIn : '10m'} );
        res.status(200).json({accessToken})
        
    }else {
        res.status(401)
        throw new Error("Email or password is not valid")
    }
    
});

//private
const currentUser =  (req, res) => {
    res.json(req.user)
};



export { registerUser, loginUser, currentUser }
