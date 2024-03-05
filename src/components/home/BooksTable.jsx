import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'

export const BooksTable = ({ books }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
            <thead>
              <tr>
                <th className='border border-slate-600 rounded-md'>No</th>
                <th className='border border-slate-600 rounded-md'>Title</th>
                <th className='border border-slate-600 rounded-md max-md:hidden'>Auhtor</th>
                <th className='border border-slate-600 rounded-md'>Year</th>
                <th className='border border-slate-600 rounded-md'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {index + 1}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {book.title}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {book.author}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {book.publishYear}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    <div className='flex justify-center gap-x-4'>              
                      <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className='text-blue-500 text-2xl' />
                      </Link>
                      <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className='text-yellow-500 text-2xl' />
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
                        <MdOutlineDelete className='text-red-500 text-2xl' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  )
}
