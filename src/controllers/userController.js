import { userRegister, userLogin } from "../services/user.js";

export const register = async (req, res) => {
  try {
    console.log("route hit", req.body);
    const saveUser = await userRegister(req.body);
    console.log("save", saveUser);
    return res.status(201).json({
      message: "user registered successfully",
      saveUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await userLogin(req.body);
    return res.json({ token });
  } catch (error) {
    console.error("error: ", error);
    return res.status(500).json({
      message: error.message || "Internal Server error",
    });
  }
};
