import 'shoelace-css/dist/shoelace.css'
import './styles.css'
import Card from './src/Card'

document.addEventListener('DOMContentLoaded', function (event) {
  Card.getAll().then(allTheCards => {
    for (let card of allTheCards) {
      createCardDom(card)
    }
  })

  document.getElementById('new-card-button').addEventListener('click', function (event) {
    event.preventDefault()
    createNewCardForm()
  })
})

function createCardDom (card) {
  let cardsContainer = document.getElementById('cards')
  let cardDom = document.createElement('li')
  cardDom.classList.add('flash-card')
  cardDom.dataset.cardId = card.id
  console.log('card id', card.id)

  cardDom.classList.add('card-Dom')
  cardDom.innerHTML = `<h3 class = 'question'>${card.question}</h3>
  <p class = 'answer'>${card.answer}</p>`

  let newDeleteButton = createDeleteButton(card, cardDom)
  let newEditButton = createEditButton(card)
  let newCardButton = createNewCardButton()
  cardDom.appendChild(newDeleteButton)
  cardDom.appendChild(newEditButton)
  cardDom.appendChild(newCardButton)

  cardsContainer.prepend(cardDom)
}

function createDeleteButton (card, cardDom) {
  let newDeleteButton = document.createElement('a')
  newDeleteButton.innerHTML = 'Delete Card'
  newDeleteButton.classList.add('linkButton')
  newDeleteButton.setAttribute('href', '#delete-card')
  newDeleteButton.addEventListener('click', function (event) {
    card.delete().then(() => {
      cardDom.remove()
    })
  })
  return newDeleteButton
}

function createEditButton (card) {
  let editButton = document.createElement('a')
  editButton.classList.add('linkButton')
  editButton.innerText = 'Edit Card'
  editButton.setAttribute('href', '#edit-card')
  editButton.addEventListener('click', function (event) {
    event.preventDefault()
    document.getElementById('edit-card').innerHTML = ''
    createForm(card)
  })
  return editButton
}

function createForm (card) {
  let gameContainer = document.getElementById('edit-card')
  let createForm = document.createElement('form')
  createForm.classList.add('edit-form')

  let createInputQuestion = document.createElement('input')
  createInputQuestion.classList.add('input-question')
  let createInputAnswer = document.createElement('input')
  createInputAnswer.classList.add('input-answer')

  createInputQuestion.type = 'text'
  createInputAnswer.type = 'text'

  createInputQuestion.value = card.question
  createInputAnswer.value = card.answer

  createForm.appendChild(createInputQuestion)
  createForm.appendChild(createInputAnswer)
  gameContainer.appendChild(createForm)

  createSaveButton(card.id)
  createCancelButton(card.id)
}

function createNewCardForm () {
  console.log('hi')
  let formDiv = document.getElementById('create-card')
  let form = document.createElement('form')
  form.classList.add('create-card-form')

  let createInputQuestion = document.createElement('input')
  createInputQuestion.classList.add('input-question')
  let createInputAnswer = document.createElement('input')
  createInputAnswer.classList.add('input-answer')

  createInputQuestion.type = 'text'
  createInputAnswer.type = 'text'

  form.appendChild(createInputQuestion)
  form.appendChild(createInputAnswer)
  formDiv.appendChild(form)
}

function createNewCardButton () {
  let newCardButton = document.createElement('a')
  newCardButton.classList.add('linkButton')
  newCardButton.innerText = 'Create New Card'
  newCardButton.setAttribute('id', 'new-card-button')
  newCardButton.setAttribute('href', '#create-card')
  return newCardButton
}

function createSaveButton (card) {
  let editForm = document.getElementById(card)
  var editButton = document.createElement('button')
  editButton.classList.add('edit-button')
  editButton.innerText = 'Save'
  document.getElementsByClassName('edit-form')
  var cancelButton = document.createElement('button')
  cancelButton.classList.add('cancel-button')
  cancelButton.innerText = 'Cancel'

  createForm.appendChild(editButton)
  createForm.appendChild(cancelButton)
}
