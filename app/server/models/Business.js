const mongoose = require('mongoose');

const { Schema } = mongoose;
const BusinessSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  contracts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Contractee',
    },
  ],
});

const Business = mongoose.model('Business', BusinessSchema);
module.exports = Business;
