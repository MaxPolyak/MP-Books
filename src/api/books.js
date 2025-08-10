import axios from 'axios'

export async function fetchBooks() {
  try {
    const response = await axios.get('http://localhost:3000/books')
    return response.data
  } catch (error) {
    console.error('Ошибка при загрузке списка книг:', error)
    return []
  }
}
