import mongoose, { Schema, models } from "mongoose"

// Define a preset schema for better typing
const ParameterPresetSchema = new Schema({
  weights: {
    tlr: { type: Number, required: true },
    rpp: { type: Number, required: true },
    go: { type: Number, required: true },
    oi: { type: Number, required: true },
    perc: { type: Number, required: true }
  },
  category: { type: String },
  year: { type: String }
}, { _id: false });

const UserSchema = new Schema({
  name: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: "" },
  parameters: {
    type: Object, // Current active parameters
    default: {},
  },
  saved_presets: {
    type: Object, // Named parameter presets
    default: {},
  },
  last_active_preset: {
    type: String, // Name of the last used preset
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

const User = models.User || mongoose.model("User", UserSchema)
export default User
