import * as jwt from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";

interface TokenUser {
    id: string;
    name: string;
    
}
const createToken = (user: TokenUser) => {
    const accessToken = jwt.sign(
        {name:user.name, id:user.id},
         process.env.JWT_SECRET
    );

    return accessToken;
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies["access-Token"];
    
    if(!accessToken){
        return res.status(401).json({message: "User not authenticated"});
    }

    try {

        const validToken = jwt.verify(accessToken, process.env.JWT_SECRET as string);

        if(validToken){
            req.authenticated = true;
            return next();
        }

    }catch (error) {
        return res.status(403).json({message: "Invalid token"});
    }
};

export {createToken, validateToken};