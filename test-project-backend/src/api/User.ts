import { registerUser, loginUser, profile, logoutUser } from "../application/User";
import expess from "express";
import { validateToken } from "../JWT";

const UserRouter = expess.Router();

UserRouter
    .route('/register')
    .post(registerUser);

UserRouter
    .route('/login')
    .post(loginUser,validateToken);

UserRouter
    .route('/logout')
    .post(validateToken,logoutUser);

UserRouter
    .route('/profile')
    .get(validateToken,profile);

export default UserRouter;