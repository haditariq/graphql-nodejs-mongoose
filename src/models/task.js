const { Schema, model, Types } = require('mongoose');

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    completed: { 
      type: Boolean,
      default: false,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
module.exports = model('Task', taskSchema);
