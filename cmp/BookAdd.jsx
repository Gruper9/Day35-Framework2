
import { bookService } from "../services/book.service.js"

export function BookAdd(){
   
   function searchBook(ev,search){
ev.preventDefault()
    const bookList=bookService.ask(search)
console.log(bookList);
   }
   
   
    return(
        <section className="book-add">
            <form onSubmit={()=>searchBook()}>
                <input type="text"></input>
                <button>search</button>
            </form>

        </section>
    )
}