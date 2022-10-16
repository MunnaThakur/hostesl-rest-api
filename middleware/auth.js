import jwt from "jsonwebtoken";

const SECRET_KEY = "test";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decodedData) => {
      if (err) {
        console.log(err.message);
        res.json({ message: "error occured" });
      } else {
        console.log(decodedData);
        next();
      }
    });
  } else {
    res.json({ message: "unauthorised" });
  }
};
