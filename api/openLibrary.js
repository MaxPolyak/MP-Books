import axios from 'axios'

export async function fetchCoverUrl(title) {
  try {
    const response = await axios.get('https://openlibrary.org/search.json', {
      params: { title }
    })
    const docs = response.data.docs
    if (docs && docs.length > 0 && docs[0].cover_i) {
      return `https://covers.openlibrary.org/b/id/${docs[0].cover_i}-M.jpg`
    }
  } catch (error) {
    console.error('Ошибка при загрузке обложки:', error)
  }
  return 'https://via.placeholder.com/150x220?text=Обложка'
}
