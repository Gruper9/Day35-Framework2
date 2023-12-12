
import { bookService } from "../services/book.service.js"

const { useState } = React
const { useNavigate } = ReactRouterDOM


export function BookAdd() {
    const [searchBook, setSearchBooks] = useState(null)
    const [bookList, setBookList] = useState(null)
    const navigate = useNavigate()

    function onSearchBook(ev) {
        ev.preventDefault()
        bookService.ask(searchBook)
            .then(res => setBookList(res.items))

    }

    function handleChange(event) {
        const target = event.target
        let value = target.value
        setSearchBooks(value)
    }
    
    function addBook(book) {
        const newBook = {
            title: book.title,
            subtitle: book.subtitle,
            thumbnail: book.imageLinks.thumbnail            ,
            listPrice: {
                amount: 0,
                currencyCode: "EUR",
                isOnSale: false
            }
        }

        bookService.save(newBook)
            .then((res) => {
                showSuccessMsg('Please enter price')
                navigate(`/book/edit/${res.id}`)
            })
            .catch((err) => {
                console.log(err);
                showErrorMsg('Sotmhing went wrongs...')
            })
    }




    return (
        <section className="book-add">

            <form onSubmit={onSearchBook}>
                <label htmlFor="bookSearch">search book: </label>
                <input type="text" onChange={handleChange} id="bookSearch" name="bookSearch"></input>
                <button>search</button>
            </form>
            {bookList && <ul>
                {bookList.map(book => (<li key={book.id}><button onClick={() => addBook(book.volumeInfo)}>+</button>{book.volumeInfo.title} </li>

                ))}

            </ul>}
        </section>
    )
}