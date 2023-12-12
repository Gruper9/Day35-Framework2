import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React


export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.bookId) {
            loadBook()
        }
    }, [])
    function loadBook() {
        bookService.get(params.bookId)
            .then(setBookToEdit)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }

    function handlePriceChange({ target }) {
        let value = +target.value
        const listPrice = { ...bookToEdit.listPrice, amount: value }
        setBookToEdit(prevBook => ({ ...prevBook, listPrice }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
        .then(() => {
            showSuccessMsg('Book added successfully')
            navigate('/book')
        })
        .catch((err)=> {
            console.log(err);
            showErrorMsg('Sotmhing went wrongs...')
        })
    }

    return (
        <section className="book-edit">
            <h1>Add book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">booke title</label>
                <input onChange={handleChange} value={bookToEdit.title} type="text" name="title" id="title" />

                <label htmlFor="subtitle">book subtitle</label>
                <input onChange={handleChange} value={bookToEdit.subtitle} type="text" name="subtitle" id="subtitle" />


                <label htmlFor="price">book price</label>
                <input onChange={handlePriceChange} value={bookToEdit.listPrice.amount || ''} type="number" name="price" id="price" />

                <button disabled={!bookToEdit.title}>Save</button>
            </form>

        </section>
    )
}