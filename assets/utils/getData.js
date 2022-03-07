const getData = async () => {
  let data = JSON.parse(localStorage.getItem('commentsData'))

  if (!data) {
    const response = await fetch('assets/data/data.json')
    data = await response.json()
    localStorage.setItem('commentsData', JSON.stringify(data))
  }

  return data
}

export default getData
