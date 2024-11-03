const mongoose = require("mongoose");
const roles = require("../constants/roles");

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    login: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: roles.USER,
    },
  },
  { timestamps: true }
);

// Pre-save hook для установки значения login перед сохранением
UserSchema.pre("save", async function (next) {
  if (this.email && !this.login) {
    let login = this.email.split("@")[0];
    let userExists = await mongoose.models.User.findOne({ login });
    while (userExists) {
      login = `${this.email.split("@")[0]}_${Math.floor(
        Math.random() * 10000
      )}`;
      userExists = await mongoose.models.User.findOne({ login });
    }
    this.login = login;
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
