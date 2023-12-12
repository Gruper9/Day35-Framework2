

export function BookPreview({ book }) {

    return (
        <article className="book-preview">
            <h2>Book Title: {book.title}</h2>
            <h4>Book price: ${book.listPrice.amount}</h4>
            <img src={`../assets/img/books/${book.thumbnail}`} alt={`Thumbnail for ${book.title}`} />
        </article>
    )
}