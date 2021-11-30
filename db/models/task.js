const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  isDele: { type: Boolean, default: false, required: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
 }
},
{timestamps: true});

module.exports = mongoose.model("Task", taskSchema);
