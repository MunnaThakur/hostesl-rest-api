import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const SECRET_KEY = "test";

// const maxAge = 3 * 24 * 60 * 60;
const createToken = (email) => {
  return jwt.sign({ email }, SECRET_KEY);
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await UserModel.findOne({ email });
    if (!result) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const checkPassword = await bcrypt.compare(password, result.password);

    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // const token = await jwt.sign(
    //   { email: result.email, id: result._id },
    //   SECRET_KEY,
    //   { expiresIn: "1h" }
    // );
    // res.status(200).json({ data: result, token });

    // const token = createToken(result._id);
    // const {password, ...other} = result
    res.cookie("newUser", result.token);
    res.status(201).json(result );
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const generateToken = createToken(email);

    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      token: generateToken
    });

    // const token = jwt.sign(
    //   { email: result.email, id: result._id },
    //   SECRET_KEY,
    //   { expiresIn: "1h" }
    // );

    // const token = createToken(result._id);
    // console.log("gen token", token);
    // res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });

    res.status(201).json({ result });

    // res.status(201).json({ user: result._id });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
};

export const getAllUser = async (req, res) => {
  try {
    const data = await UserModel.find();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
};

export const testCookie = (req, res) => {
  res.cookie("newUser", "Narayan");
  res.json({ message: "Cookie is working fine" });
};
