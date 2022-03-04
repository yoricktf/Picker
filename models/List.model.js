const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the list model to whatever makes sense in this case
const listSchema = new Schema(
  {
    listName: String,
    listDescription: String,
    isPublic: Boolean,
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const List = model('List', listSchema);

module.exports = List;
