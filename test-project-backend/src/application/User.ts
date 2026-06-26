import { Request,Response,NextFunction } from "express";
import User from "../infrastructure/db/entities/User";
import bcrypt from "bcrypt";
import {createToken} from "../JWT";   
import * as jwt from "jsonwebtoken"

const registerUser = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { name, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, password: hashedPassword});
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
      
       
    } catch (error) {
        next(error);
    }
};

const loginUser = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {  
    try {
        const {name, password} = req.body;
        const user = await User.findOne({name:name});

        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        

        const dbPassword = user.password;
        const isPasswordtrue = await bcrypt.compare(password,dbPassword);
        if(!isPasswordtrue){
            return res.status(401).json({message: "Username or password is incorrect please try again!"});
        }

        else{
            const accessToken = createToken(user);
            res.cookie("access-Token", accessToken, {
                maxAge: 24 * 60 * 60 * 1000, 
            })
            res.status(200).json({message: "User logged in successfully"});
         }
        
    } catch (error) {
        next(error);
    }
};

const logoutUser = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try{
        res.clearCookie("access-Token");
        res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        next(error);
    }
};

const profile = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try{
        const accessToken = req.cookies["access-Token"];

        const decoded = jwt.decode(accessToken) as {id: string; name: string};

        res.status(200).json({
            user:{
                id:decoded.id,
                name:decoded.name,
            }
        });
    }catch(error){
        next(error)
    }
};

const getAllUsers = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try{
        const users = await User.find()
        res.status(200).json(users);
    }catch(error)
    {
        next(error)
    }
}


export { registerUser, loginUser, logoutUser,profile ,getAllUsers};