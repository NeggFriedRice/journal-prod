import { Link } from "react-router-dom"

const CategorySelection = ({categories}) => {

  return (
    <>
      <h3>Please select a category:</h3>
      <ul>
        {
        categories.map((category, index) => (
          <li key={index}>
            <Link to={`/entry/new/${index}`}>{category.name}</Link>
            </li>
        ))
        }
      </ul>
    </>
  )
}

export default CategorySelection