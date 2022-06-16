import { Schema, model, models } from 'mongoose'

const notesSchema = new Schema({
  noteTitle: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
})

const bookSchema = new Schema({
  title: String,
  description: String,
  bid: String,
  userId: {
    type: String,
    default: '123456',
  },
  notes: [notesSchema],
})

export const Book = models.Book || model('Book', bookSchema)
export const Note = models.Note || model('Note', notesSchema)
