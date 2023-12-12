const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from "./cmp/Appheader.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Home } from "./pages/Home.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { UserMsg } from "./cmp/UserMsg.jsx"


export function App() {
    return (
        <Router>
        <section className="app main-layout">
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutUs />} /> 
                    <Route path="/book" element={<BookIndex />} />
                    <Route path="/book/:bookId" element={<BookDetails />} />
                    <Route path="/book/edit" element={<BookEdit />} />
                    <Route path="/book/edit/:bookId" element={<BookEdit />} />
                </Routes>
            </main>
            <UserMsg />
            console.log('hello');
        </section>
    </Router>
    )
}