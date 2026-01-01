import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    collegeEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    selectedLanguage: {
      type: String,
      required: true,
      enum: [
        "french",
        "spanish",
        "hindi",
        "english",
        "japanese",
        "chinese",
        "german",
        "italian",
        "korean",
        "portuguese",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    userType: {
      type: String,
      enum: ["user", "faculty"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.User || mongoose.model("User", UserSchema)
