import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = async (data) => {
  try {
    const { name, username, password, bio } = data;

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return {
        success: false,
        message: "Username already exists",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      username,
      password: hashedPassword,
      bio: bio || "",
    });
    const savedUser = await newUser.save();

    const token = jwt.sign(
      { userId: savedUser._id, username: savedUser.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return {
      success: true,
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        username: savedUser.username,
        bio: savedUser.bio,
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

    const existingUser = await UserModel.findOne({ username: username });
    if (!existingUser) {
      return {
        success: false,
        message: "User didn't exist! Please Register first",
      };
    } else if (existingUser) {
      const encryptPassword = existingUser.password;
      const validPassword = await bcrypt.compare(password, encryptPassword);

      if (!validPassword) {
        return {
          success: false,
          message: "Invalid Credentials",
        };
      }

      const token = jwt.sign(
        { id: existingUser._id, username: existingUser.username },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return {
        success: true,
        token,
        user: {
          id: existingUser._id,
          name: existingUser.name,
          username: existingUser.username,
          bio: existingUser.bio,
          avatar: existingUser.avatar,
          followers: existingUser.followers,
          following: existingUser.following,
          createdAt: existingUser.createdAt,
          updatedAt: existingUser.updatedAt,
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Error Login user",
      error: error.message,
    };
  }
};

export const userUpdate = async (userId, data) => {
  try {
    const { name, bio, avatar } = data;


    const existingUser = await UserModel.findById(userId);
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

    const updatedUser = await UserModel.findByIdAndUpdate(
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
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        bio: updatedUser.bio,
        avatar: updatedUser.avatar,
        followers: updatedUser.followers,
        following: updatedUser.following,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update the User Details",
      error: error.message,
    };
  }
};

export const getUserDataByUsername = async (username) => {
  try {
    const userData = await UserModel.findOne({ username });
    if (!userData) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      user: {
        id: userData._id,
        name: userData.name,
        username: userData.username,
        bio: userData.bio,
        avatar: userData.avatar,
        followers: userData.followers,
        following: userData.following,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to Find the User Details",
      error: error.message,
    };
  }
};
