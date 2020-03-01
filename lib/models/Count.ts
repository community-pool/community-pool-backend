const mongoose = require('mongoose');

const countSchema = new mongoose.Schema(
  {
    routeName: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    toJSON: {
      transform: function(doc, ret) {
        delete ret.__v;
      }
    }
  }
);

module.exports = mongoose.model('Channel', countSchema);
