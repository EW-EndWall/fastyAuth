import mongoose from "mongoose";
import userSchemaDefinition from "./../schemas/user.js";

const UserSchema = new mongoose.Schema(userSchemaDefinition);

UserSchema.methods.addModificationDate = function () {
  if (this.lastModifiedAt.length >= 5) this.lastModifiedAt.shift();

  this.lastModifiedAt.push(Date.now());
};

UserSchema.pre("save", function (next) {
  const user = this;

  // * If email is modified, set emailVerified to false
  if (user.isModified("contact.email"))
    user.verify.verificationType.emailVerified = false;

  if (user.isModified("contact.phone"))
    user.verify.verificationType.phoneVerified = false;

  // * Add last modification date
  user.addModificationDate();

  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
