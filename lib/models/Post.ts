import mongoose = require('mongoose');
import { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  userName: string;
  title: string;
  content: string;
}

const postSchema: Schema = new Schema(
  {
    userName: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
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

export default mongoose.model<IPost>('Post', postSchema);
