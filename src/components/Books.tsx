import React, {ChangeEvent, useEffect, useState} from 'react'
import {Button, Grid, TextField} from "@mui/material";
import './Books.css'
import _ from "lodash";



interface Book {
  id: string;
  title: string;
  author: string;
}

const Books = (): JSX.Element => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  // @ts-ignore
  const [books, setBooks] = useState<Book[]>( JSON.parse(localStorage.getItem('books')) || [])

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books))
  }, [books])

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if(title && author) {
      setBooks([
        ...books,
        {
          id: _.uniqueId(),
          title,
          author
        }
      ])
      localStorage.setItem('books', JSON.stringify(books))
    }
  }

  const handleDelete = (id: any) => {
    const removeBook = books.filter((b) => b.id !== id)
    setBooks(removeBook)

  }

  return (
    <Grid container className={"booksContainer"}>
        <Grid container item className={"booksInputContainer"}>
          <TextField id="outlined-basic" label="title" variant="outlined" value={title} onChange={handleTitleChange}/>
          <TextField id="outlined-basic" label="author" variant="outlined" value={author} onChange={handleAuthorChange}/>
          <Button variant="outlined" type="submit" onClick={handleSubmit}>Submit </Button>
        </Grid>
      <h1>Books</h1>
      <Grid container item className={"bookListContainer"}>
        <div className={"bookList"}>
          <ul>
            {books.map((book, idx) =>  {
              const {title, author, id} = book
              return (
                <li key={`book-${idx}`}>
                  {title} | {author}
                  <Button onClick={() => handleDelete(id)}>Delete</Button>
                </li>
              )
            })}
          </ul>
          </div>
      </Grid>
    </Grid>

  )
}

export default Books