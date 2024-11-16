import jwt from "jsonwebtoken";

export const authMiddleware = async (resolve, parent, args, context, info) => {
  try {
    const token = context.token; 

    if (!token) {
      throw new Error("Protected route. Authentication token required.");
    }
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    context.user = decodedToken; 
    return resolve(parent, args, context, info); 
  } catch (error) {
    throw new Error("Authentication failed.");
  }
};
