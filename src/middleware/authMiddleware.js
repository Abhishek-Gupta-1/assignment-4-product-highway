import jwt from "jsonwebtoken";

export const authMiddleware = async (resolve, parent, args, context, info) => {
  try {
    const token = context.token; 
    console.log("Token in middleware:", token);

    if (!token) {
      throw new Error("Protected route. Authentication token required.");
    }

    // Verify tokenJWT_SECRET
 
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    context.user = decodedToken; // Attach userId to context for downstream access
    console.log("context.usr: ", context.user);
    return resolve(parent, args, context, info); // Proceed with the original resolver
  } catch (error) {
    throw new Error("Authentication failed.");
  }
};
