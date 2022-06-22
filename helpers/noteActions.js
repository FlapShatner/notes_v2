export async function createNote(formData, bid) {
  const { noteTitle, content, nid } = formData
  const response = await fetch('/api/notes', {
    method: 'POST',
    body: JSON.stringify({
      noteTitle: noteTitle,
      content: content,
      nid: nid,
      bid: bid,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response
}

export async function delNote(noteId) {
  if (!noteId._id) {
    const { bid, nid } = noteId
    const response = await fetch('/api/notes/' + nid, {
      method: 'DELETE',
      body: JSON.stringify({
        bid: bid,
        nid: nid,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response)
    return response
  }
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
