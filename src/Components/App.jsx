import React, { useEffect, useState } from 'react'
import Home from './Home.jsx'
import CategorySelection from './CategorySelection.jsx'
import NewEntry from './NewEntry.jsx'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import NavBar from './NavBar.jsx'
import ShowEntry from './ShowEntry.jsx'

const App = () => {

  const [categories, setCategories] = useState([])
  const [entries, setEntries] = useState([{category: 0, content: "Pizza is great"}])

  useEffect(() => {
    fetch('http://localhost:4001/categories')
      .then((response) => response.json())
      // .then(data => console.log(data))
      .then(data => setCategories(data))

      fetch('http://localhost:4001/entries')
      .then((response) => response.json())
      // .then(data => console.log(data))
      .then(data => setEntries(data))
  }, [])

  async function addEntry(cat_id, content) {
    const newId = entries.length
    // Create new entry
    // 1. Create an entry object from entry data
    const newEntry = {
      category: categories[cat_id]._id,
      content: content
    }

    // 1.5. POST new entry to API
    const res = await fetch('http://localhost:4001/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEntry)
    })
    // .then(response => response.json())
    // .then(data => setEntries([...entries, data]))
    const data = await res.json()

    // 2. Add entry to the entries list
    setEntries([...entries, data])
    return newId
  }

  

  // Higher Order Component (HOC)
  function ShowEntryWrapper() {
    const { id } = useParams()
    return <ShowEntry entry={entries[id]}/>
  }

  return (
    <>
    <BrowserRouter>
    <NavBar />
    <button className="button is-primary">Hello</button>
      <Routes>
        <Route path='/' element={<Home entries={entries}/>}></Route>
        <Route path='/category' element={<CategorySelection categories={categories}/>}></Route>
        <Route path='/entry'>
          <Route path=':id' element={<ShowEntryWrapper />}/>
          <Route path='new/:cat_id' element={<NewEntry categories={categories} addEntry={addEntry} />} />
        </Route>
        <Route path='*' element={<h3>Page not found</h3>}></Route>
      </Routes>
    </BrowserRouter>
    {/* <Home />
    <CategorySelection />
    <NewEntry /> */}
    </>
  )
}

export default App