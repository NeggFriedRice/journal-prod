import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"

const NewEntry = ({ categories, addEntry }) => {

  let [entry, setEntry] = useState("")

  const params = useParams()
  const nav = useNavigate()

  async function createEntry(event) {
    // 1. Prevent refresh (default behaviour)
    event.preventDefault()
    // 2. Create new entry
    const id = await addEntry(params.cat_id, entry)
    // 3. Clear input textarea
    setEntry("")
    // 4. Redirect the browser to the new entry
    nav(`/entry/${id}`)
    
  }
   
  console.log(entry)
  return (
    <>
      <h3>New entry in category {categories[params.cat_id]?.name}</h3>
      <form className="container" onSubmit={createEntry}>
        <div className="field">
          <label className="label">Entry</label>
          <div className="control">
            <textarea className="textarea" onChange={event => setEntry(event.target.value)} value={entry} placeholder="Type your journal entry here"></textarea>
        </div>
      </div>
        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-link">Create Entry</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default NewEntry