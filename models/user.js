import mongoose from "mongoose";

const userSchema = {
  name: {
    type: "string",
  },
  email: {
    type: "string",
  },
  password: {
    type: "string",
    required: false,
  },
  google_id: {
    type: "string",
    required: false,
  },
  id: {
    type: "string",
  },
  token:{
    type: "string"
  }
};

export default mongoose.model("User", userSchema);
