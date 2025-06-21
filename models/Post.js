const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es obligatorio'],
    },
    content: {
      type: String,
      required: [true, 'Debe tener contenido'],
    },
    image: {
      type: String,
      default: null,
  },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        createdAt: { type: Date, default: Date.now },
      }
    ],
    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
