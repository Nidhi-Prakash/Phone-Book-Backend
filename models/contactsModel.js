import { mongoose } from "mongoose";

const contactsSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  Name: {
    type: String,
    required: [true, "Name is required"],
  },
  Phone_Number: {
    type: Number,
    required: [true, "Phone number is required"],
  },
});

export default mongoose.model("Contact", contactsSchema);
