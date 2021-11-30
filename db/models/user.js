const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true,unique: true },
  password: { type: String, required: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true
 },
//  tasks: [{
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'Task'
// }]
},
{timestamps: true});

module.exports = mongoose.model("User", userSchema);
