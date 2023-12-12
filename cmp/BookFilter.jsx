
const { useState, useEffect } = React


export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSetFilterBy(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange(event) {
        const target = event.target
        const field = target.name //txt / minPrice
        let value = target.value // always str

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }


    const { txt, minPrice } = filterByToEdit

    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSetFilterBy} >
                <label htmlFor="txt">Title: </label>
                <input value={txt} onChange={handleChange} type="text"  name="txt" />
                
                <label htmlFor="minPrice">minPrice: </label>
                <input value={minPrice || ''} onChange={handleChange} type="number" name="minPrice" />

                <button>Submit</button>
            </form>
        </section>
    )
}