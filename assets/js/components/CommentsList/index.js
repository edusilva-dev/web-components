import styles from './styles.js'
import getData from '/assets/utils/getData.js'

export default class CommentsList extends HTMLElement {
  constructor() {
    super()

    this.build()
  }

  async build() {
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(styles)

    const data = await getData()

    data.comments.forEach(async comment => {
      const commentBox = await this.createCommentBox(comment)
      shadow.appendChild(commentBox)
    })
  }

  async createCommentBox(comment) {
    const commentContainer = document.createElement('div')
    commentContainer.classList.add('comment')

    const commentVote = this.mountCommentVote(comment)
    commentContainer.appendChild(commentVote)

    const commentContent = this.mountCommentContent(comment)
    commentContainer.appendChild(commentContent)

    const commentReply = this.mountCommentReply()
    commentContainer.appendChild(commentReply)

    const commentDelete = await this.mountCommentDelete(comment)
    if (commentDelete) commentContainer.appendChild(commentDelete)

    return commentContainer
  }

  mountCommentVote(comment) {
    const commentVote = document.createElement('div')
    commentVote.setAttribute('data-vote', comment.score)
    commentVote.classList.add('comment__vote', 'vote')

    const commentVotePlus = document.createElement('img')
    commentVotePlus.src = 'assets/images/icon-plus.svg'
    commentVotePlus.classList.add('vote__plus')
    commentVotePlus.addEventListener(
      'click',
      async () => await this.onVoteComment(comment.id, commentVote, +1)
    )
    commentVote.appendChild(commentVotePlus)

    const commentVoteScore = document.createElement('span')
    commentVoteScore.innerText = comment.score
    commentVoteScore.classList.add('vote__score')
    commentVote.appendChild(commentVoteScore)

    const commentVoteMinus = document.createElement('img')
    commentVoteMinus.src = 'assets/images/icon-minus.svg'
    commentVoteMinus.classList.add('vote__minus')
    commentVoteMinus.addEventListener(
      'click',
      async () => await this.onVoteComment(comment.id, commentVote, -1)
    )
    commentVote.appendChild(commentVoteMinus)

    return commentVote
  }

  mountCommentContent(comment) {
    const commentContent = document.createElement('div')
    commentContent.classList.add('comment_content', 'content')

    const userContainer = document.createElement('div')
    userContainer.classList.add('content__about_user', 'user')

    const userImage = document.createElement('img')
    userImage.src = comment.user.image.png
    userImage.classList.add('user__image')
    userContainer.appendChild(userImage)

    const userName = document.createElement('span')
    userName.innerText = comment.user.username
    userName.classList.add('user__name')
    userContainer.appendChild(userName)

    const createdAt = document.createElement('span')
    createdAt.innerText = comment.createdAt
    createdAt.classList.add('user__created_at')
    userContainer.appendChild(createdAt)

    const commentary = document.createElement('p')
    commentary.innerText = comment.content
    commentary.classList.add('content__text')

    if (comment.replies.length) {
      console.log('tem coisa aqui')
    }

    commentContent.appendChild(userContainer)
    commentContent.appendChild(commentary)
    return commentContent
  }

  mountCommentReply() {
    const replyButtonContainer = document.createElement('div')
    replyButtonContainer.classList.add('comment_reply', 'reply')

    const replyIcon = document.createElement('img')
    replyIcon.src = 'assets/images/icon-reply.svg'
    replyIcon.classList.add('reply__icon')
    replyButtonContainer.appendChild(replyIcon)

    const replyText = document.createElement('span')
    replyText.innerText = 'Reply'
    replyText.classList.add('reply__text')
    replyButtonContainer.appendChild(replyText)

    return replyButtonContainer
  }

  async mountCommentDelete(comment) {
    const data = await getData()
    if (data.currentUser.username !== comment.user.username) return

    const deleteButtonContainer = document.createElement('div')
    deleteButtonContainer.classList.add('comment__delete', 'delete')
    deleteButtonContainer.addEventListener(
      'click',
      async () => await this.onDeleteComment(deleteButtonContainer, comment.id)
    )

    const deleteIcon = document.createElement('img')
    deleteIcon.src = 'assets/images/icon-delete.svg'
    deleteIcon.classList.add('delete__icon')
    deleteButtonContainer.appendChild(deleteIcon)

    const deleteText = document.createElement('span')
    deleteText.innerText = 'Delete'
    deleteText.classList.add('delete__text')
    deleteButtonContainer.appendChild(deleteText)

    return deleteButtonContainer
  }

  async onDeleteComment(deleteButtonContainer, commentId) {
    const data = await getData()
    const newComments = data.comments.filter(comment => comment.id !== commentId)

    const commentContainer = deleteButtonContainer.parentNode
    commentContainer.remove()

    data.comments = newComments
    localStorage.setItem('commentsData', JSON.stringify(data))
  }

  async onVoteComment(commentId, container, operation) {
    const score = container.querySelector('.vote__score')
    const currentVote = Number(container.getAttribute('data-vote'))
    const newScore = currentVote + operation

    const data = await getData()
    const newCommentsVote = []
    for (const comment of data.comments) {
      if (comment.id === commentId) {
        comment.score = newScore
      }

      newCommentsVote.push(comment)
    }

    data.comments = newCommentsVote

    localStorage.setItem('commentsData', JSON.stringify(data))

    score.innerText = newScore
    container.setAttribute('data-vote', newScore)
  }
}
