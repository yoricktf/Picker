const { Schema, model } = require('mongoose');


// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    profilePicture: String,
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    matches: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    lists: [{ type: Schema.Types.ObjectId, ref: 'List' }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
