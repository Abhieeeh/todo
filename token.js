import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const secretKey=process.env.Token_Secret;   

 const generateToken = (payload) => {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
};

const verifyToken = (token) => {
    
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    };

export {generateToken,verifyToken};