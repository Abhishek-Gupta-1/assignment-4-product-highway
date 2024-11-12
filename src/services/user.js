import UserModal from "../modals/user.modal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = async (data) => {
  try {
    const { name, username, password, bio } = data;
    console.log("data of user registration:", data);

    // Check if username already exists
    const existingUser = await UserModal.findOne({ username });

    if (existingUser) {
      console.log("user exist", existingUser);
      return {
        success: false,
        message: "Username already exists",
      };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new UserModal({
      name,
      username,
      password: hashedPassword,
      bio: bio || "",
    });

    // Save user to database
    const savedUser = await newUser.save();
    console.log("save in db", savedUser);

    // Generate JWT token
    const token = jwt.sign(
      { userId: savedUser._id, username: savedUser.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Return success response without password
    return {
      success: true,
      data: {
        user: {
          id: savedUser._id,
          name: savedUser.name,
          username: savedUser.username,
          bio: savedUser.bio,
          avatar: savedUser.avatar,
          followers: savedUser.followers,
          following: savedUser.following,
          createdAt: savedUser.createdAt,
        },
        token,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Error registering user",
      error: error.message,
    };
  }
};

export const userLogin = async (data) => {
  try {
    const { username, password } = data;
    console.log("data of user login :", data);

    //check if user register or not
    const existingUser = await UserModal.findOne({ username: username });
    console.log(existingUser);
    if (!existingUser) {
      console.log("User didn't exist");
      return "User didn't exist! Please Register first";
    } else if (existingUser) {
      const encryptPassword = existingUser.password;
      const validPassword = await bcrypt.compare(password, encryptPassword);

      if (!validPassword) {
        return "Invalid credentials";
      }

      const token = jwt.sign(
        { id: existingUser._id, username: existingUser.username },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      console.log("token");

      return token;
    }
  } catch (error) {
    return {
      success: false,
      message: "Error Login user",
      error: error.message,
    };
  }
};

export const userUpdate = async (data) => {
  try {
    const { name, bio, avatar } = data;
    const userId = req.user.id;
    console.log("data of user update : ", data);
    console.log("userId from token : ", userId);

    const existingUser = await UserModal.findById(userId);
    if (!existingUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const updateFields = {};
    if (name) updateFields.name = name;
    if (bio !== undefined) updateFields.bio = bio;
    if (avatar) updateFields.avatar = avatar;

    const updatedUser = await UserModal.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return {
        success: false,
        message: "Error updating user",
      };
    }

    return {
      success: true,
      data: {
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          bio: updatedUser.bio,
          avatar: updatedUser.avatar,
        },
      },
    };
  } catch (error) {
    console.log("Error : ", error.message);
    return {
      success: false,
      message: "Failed to update the User Details",
      error: error.message,
    };
  }
};
