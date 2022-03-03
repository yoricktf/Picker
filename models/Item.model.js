const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the list model to whatever makes sense in this case
const itemSchema = new Schema(
  {
    name: String,
    description: String,
    picture: String,
    list: { type: Schema.Types.ObjectId, ref: 'List' },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Item = model('Item', itemSchema);

module.exports = Item;
