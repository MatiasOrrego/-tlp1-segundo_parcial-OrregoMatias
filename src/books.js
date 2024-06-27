import express from "express"
import {db} from "./db.js"


const app = express()

app.use (express.text())
app.use (express.json())

app.get("/", (req, res) =>{

    res.send ("Pagina principal")
})

app.get("/books",(req, res) => {
    res.json(db)
})

app.get("/books/:id", (req, res) =>{
    const id = parseInt(req.params.id)
    const getBook = db.find((e) => e.id === id)
    res.json(getBook)
})

app.post("/books", (req, res) =>{
    const id = Math.max(...db.map((e) => e.id)) + 1 
    const tittle = req.body.tittle
    const author = req.body.author
    const year = req.body.year

    const newbook = db.push({
        "id": id,
        "tittle": tittle,
        "author": author,
        "year": year
    })
    console.log(newbook)
    res.json({"mensaje":"Se creo un nuevo Libro"})
})

app.put("/books/:id", (req, res) =>{
    const id = parseInt(req.params.id)
    const {tittle, author, year} = req.body
    const getBook = db.find((e) => e.id === id)
    getBook.tittle = tittle
    getBook.author = author
    getBook.year = year

    console.log(getBook)
    res.json({"Mensaje":"Libro actuazliado"})
})

app.delete("/books/:id", (req, res) =>{
    const id = parseInt(req.params.id)
    const getBook = db.find((e) => e.id === id)
    const indexBook = db.indexOf(getBook)
    const deleteBook = db.splice(indexBook, 1)

    console.log(deleteBook)
    res.json({"mensaje": "Libro eliminado"})
})


app.listen(3000, console.log("Servidor funcionando"))