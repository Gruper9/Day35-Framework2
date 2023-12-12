import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { booksJson } from '../books.json.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = { txt: '', minSpeed: 0 }
// _createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getFilterBy,
    setFilterBy,
    getDefaultFilter,
    getPrevBookId,
    ask
}

_createBooksFromJson()
// _createBooks()


function _createBooksFromJson() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        utilService.saveToStorage(BOOK_KEY, booksJson)
        books = booksJson
    }
    console.log(books)
}

function getDefaultFilter() {
    return { txt: '', minPrice: '' }
}

function query(filterBy) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', Price = 0,thumbnail= './assets/img/books/book.png') {
    return {
        title: '',
        subtitle: '',
        thumbnail,
        listPrice: {
            amount: 0,
            currencyCode: "EUR",
            isOnSale: false
        }
    }
}

function getFilterBy() {
    return { ...books }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextBookIdx = books.findIndex(book => book.id === bookId) + 1
            if (nextBookIdx === books.length) nextBookIdx = 0
            return books[nextBookIdx].id
        })
}
function getPrevBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextBookIdx = books.findIndex(book => book.id === bookId) - 1
            if (nextBookIdx === 0) nextBookIdx = books.length - 1
            return books[nextBookIdx].id
        })
}

function _createBook(title, maxPrice = 250) {
    const book = getEmptyBook(title, maxPrice)
    book.id = utilService.makeId()
    return book
}


function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook('audu', 300))
        books.push(_createBook('fiak', 120))
        books.push(_createBook('subali', 100))
        books.push(_createBook('mitsu', 150))
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function ask(userSearch) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${userSearch}`).then(res => res.data)
}


