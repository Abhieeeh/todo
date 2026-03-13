import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

 export const generateToken = (user) => {
    const token = jwt.sign({ userid: user.id }, process.env.SECRET, { expiresIn: '1h' });
    return token;
};
