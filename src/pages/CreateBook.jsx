import {useState} from 'react'
import { BackButton } from '../components/BackButton'
import { Spinner } from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export const CreateBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const handleSaveBook = () => {
    const data = { title, author, publishYear }

    if (!title || !author || !publishYear) {
      alert('All fields are required')
    }

    setLoading(true)
    axios.post('https://books-api-server.onrender.com/books', data).then(() => {
      setLoading(false)
      enqueueSnackbar('Book created successfully', { variant: 'success' })
      navigate(`/`)
    }).catch((err) => {
      console.log(err)
      setLoading(false)
    })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
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
        <button onClick={handleSaveBook} className='bg-sky-400 text-white p-2 rounded-md'>Save</button>
      </div>
    </div>
  )
}
