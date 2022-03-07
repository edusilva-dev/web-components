import styles from './styles.js'
import commentsListStyles from '../CommentsList/styles.js'

// Data
import getData from '/assets/utils/getData.js'

// Components
import CommentsList from '../CommentsList/index.js'

export default class SendMessage extends HTMLElement {
  constructor() {
    super()

    this.build()
  }

  async build() {
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(styles)

    const data = await getData()

    const sendMessage = this.createSendMessage(data)
    shadow.appendChild(sendMessage)
  }

  createSendMessage(data) {
    const currentUser = data.currentUser

    const sendMessageContainer = document.createElement('div')
    sendMessageContainer.classList.add('send_message')

    const userImage = document.createElement('img')
    userImage.src = currentUser.image.png
    userImage.classList.add('send_message__user_image')
    sendMessageContainer.appendChild(userImage)

    const message = document.createElement('textarea')
    message.classList.add('send_message__message')
    message.placeholder = 'Add a comment...'
    sendMessageContainer.appendChild(message)

    const buttonSend = document.createElement('button')
    buttonSend.type = 'submit'
    buttonSend.innerText = 'SEND'
    buttonSend.classList.add('send_message__button')
    buttonSend.addEventListener('click', () => this.createComment(data, message))
    sendMessageContainer.appendChild(buttonSend)

    return sendMessageContainer
  }

  async createComment(data, message) {
    if (!message.value.trim()) {
      alert('Please enter a message!')
      return
    }

    const newData = {
      id: data.comments[data.comments.length - 1].id + 1,
      content: message.value,
      createdAt: new Date(),
      score: 0,
      user: {
        image: {
          png: data.currentUser.image.png,
          webp: data.currentUser.image.webp
        },
        username: data.currentUser.username
      },
      replies: []
    }

    data.comments.push(newData)

    localStorage.setItem('commentsData', JSON.stringify(data))

    const newComment = await new CommentsList().createCommentBox(newData)
    document.querySelector('comments-list').shadowRoot.appendChild(newComment)
    document.querySelector('comments-list').shadowRoot.appendChild(commentsListStyles)

    message.value = ''
  }
}
