const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    subscriptionId: {
      type: String,
      default: null,
    },
    subscriptionStatus: {
      type: String,
      default: null,
    },
    subscriptionEndDate: {
      type: Date,
      default: null,
    },
    subscriptionStartDate: {
      type: Date,
      default: null,
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

// Hash password before saving the user
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
