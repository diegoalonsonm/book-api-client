import { useState, useEffect } from 'react'
import { BackButton } from '../components/BackButton'
import { Spinner } from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export const EditBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    setLoading(true)
    axios.get(`https://books-api-server.onrender.com/books/${id}`).then((res) => {
      const { title, author, publishYear } = res.data
      setTitle(title)
      setAuthor(author)
      setPublishYear(publishYear)
      setLoading(false)
    }).catch((err) => {
      alert('Error, please check the console')
      console.log(err)
      setLoading(false)
    })
  },[])

  const handleEditBook = () => {
    const data = { title, author, publishYear }

    if (!title || !author || !publishYear) {
      alert('All fields are required')
    }

    setLoading(true)
    axios.put(`https://books-api-server.onrender.com/books/${id}`, data).then(() => {
      setLoading(false)
      enqueueSnackbar('Book updated successfully', { variant: 'success' })
      navigate(`/`)
    }).catch((err) => {
      console.log(err)
      enqueueSnackbar('Error at updating the book', { variant: 'error' })
      setLoading(false)
    })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      { loading ? ( <Spinner/>) : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 py-2 w-full rounded-md' />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 py-2 w-full rounded-md' />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Year</label>
          <input type="number" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='border-2 border-gray-500 py-2 w-full rounded-md' />
        </div>
        <button onClick={handleEditBook} className='bg-sky-400 text-white p-2 rounded-md'>Save</button>
      </div>
    </div>
  )
}
