import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const userExistsOrNot = await User.findOne({ email });
    if (userExistsOrNot) {
      res.status(400).json({ message: "This email id already exists." });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        userName,
        password: hashedPassword,
        email,
      });
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500);
    throw new Error("Server Error");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Pls register before logging in." });
    } else if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(
        {
          user: {
            email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "15m" }
      );
      res
        .status(201)
        .json({ message: "Logged in successfully.", token: accessToken });
    } else {
      res.status(400).json({ message: "Passowrd is incorrect" });
    }
  } catch (error) {
    res.status(500);
    throw new Error("Server Error");
  }
};

export const getCurrentUser = async (req, res) => {
  res.json(req.user);
};
