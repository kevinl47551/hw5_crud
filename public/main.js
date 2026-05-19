const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
  const titleToUpdate = document.querySelector('#good').value

  fetch('/ideas', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      oldTitle: titleToUpdate,
      title: 'Great idea',
      description: 'I should give everyone extra credit',
    }),
  }).then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    window.location.reload(true)
  })
})

const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', _ => {
  const titleToDelete = document.querySelector('#delete').value
  fetch('/ideas', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      oldTitle: titleToDelete
    })
  })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No idea to delete') {
            messageDiv.textContent = 'No idea with that title to delete'
        } else {
            window.location.reload(true)
        }
    })
})