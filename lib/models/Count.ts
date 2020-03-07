import mongoose = require('mongoose');
import { Schema, Document } from 'mongoose';

export interface ICount extends Document {
  routeName: string;
  count: number;
}

const countSchema: Schema = new Schema(
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

export default mongoose.model<ICount>('Count', countSchema);
