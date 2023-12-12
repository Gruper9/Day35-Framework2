const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import { BookFilter } from "../cmp/BookFilter.jsx"
import { BookList } from "../cmp/BookList.jsx"
import { BookAdd } from "../cmp/BookAdd.jsx"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())


    useEffect(() => {
        loadBooks()
        return () => {
            console.log('Unmounted')
        }
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then((books) => setBooks(books))
            .catch((err) => console.log('err:', err))
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBook => {
                    return prevBook.filter(book => book.id !== bookId)
                })
            })
            .catch(err => console.log('err:', err))

    }



    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    if (books) {
        return (
            <section className="book-index">
                {!selectedBookId &&
                    <React.Fragment>
                        <h1>Welcome to book index!</h1>
                        <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                        <button><Link to="/book/edit">Add</Link></button>
                        <button><Link to="/book/edit/addbook">Search on Google</Link></button>
                        <BookList books={books} onRemoveBook={onRemoveBook} />
                    </React.Fragment>
                }

            </section>
        )

    } else {
        return (<p>Loading books...</p>)
    }
}