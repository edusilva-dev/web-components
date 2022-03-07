const setData = async (data, storage) => {
  localStorage.setItem(storage, JSON.stringify(data))
}

export default getData
