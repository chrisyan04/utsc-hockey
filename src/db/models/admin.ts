import { Schema, model, models } from "mongoose";

const adminSchema = new Schema({
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

const Admin = models.admins || model("admins", adminSchema);

export default Admin;
