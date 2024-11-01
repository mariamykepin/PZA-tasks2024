import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  isbn: string;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
});

export const Book = mongoose.model<IBook>('Book', bookSchema);
