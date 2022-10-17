import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

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
    
    const token = jwt.sign({id: result._id}, "test",{
      expiresIn: "1hr"
    })
    
    res.cookie(String(result._id), token, {
      path: '/',
      expires: new Date(Date.now() + 1800000),
      httpOnly: true,
      sameSite: 'lax'
    })

     res.status(201).json({result, token} );
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

    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
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

export const getSingleUser = async(req, res, next) =>{
	const userId= req.id;
	
	let user;
		try{
		user = await UserModel.findById(userId, "-password");
		}catch(err){
		return new Error(err)
		}
		if(!user){
			return res.status(404).json({"message":"user not found"})
		}
		return res.status(200).json({user})
}