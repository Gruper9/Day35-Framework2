import { BookPreview } from "./BookPreview.jsx";
const { Link } = ReactRouterDOM
export function BookList({ books, onSelectBookId, onRemoveBook }) {


    return (
        <div className="books-container">
            {books.map((book) => (
                <div key={book.id} className="book-item">
                    <BookPreview book={book} />
                    <section>
                        <button><Link to={`/book/${book.id}`}>Details</Link></button>
                        <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
                    </section>
                </div>
            ))
            }
        </div>
    )
}

