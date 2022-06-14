export async function createNote(formData, bid) {
  const { noteTitle, content } = formData
  const response = await fetch('/api/notes', {
    method: 'POST',
    body: JSON.stringify({
      noteTitle: noteTitle,
      content: content,
      bid: bid,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response
}

export async function delNote(noteId) {
  const { _id, bid } = noteId
  const response = await fetch('/api/notes/' + _id, {
    method: 'DELETE',
    body: JSON.stringify({
      _id: _id,
      bid: bid,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log(response)
  return response
}
