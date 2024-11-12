import { userRegister, userLogin, userUpdate } from "../services/user.js";

export const register = async (req, res) => {
  try {
    const saveUser = await userRegister(req.body);
    return res.status(201).json({
      message: "user registered successfully",
      saveUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error registering user",
    });
  }
};

export const login = async (req, res) => {
  try {
    const token = await userLogin(req.body);
    return res.json({ token });
  } catch (error) {
    console.error("error: ", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server error",
    });
  }
};

export const update = async (req, res) => {
  try {
    const  userId = req.user.id;
    const response = await userUpdate(userId, req.body);
    return res.json({ response });
  } catch (error) {
    console.log("Error : ", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server error",
    });
  }
};
