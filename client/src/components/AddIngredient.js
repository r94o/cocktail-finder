import { useEffect, useState } from "react";

const AddIngredient = ({ addIngredient }) => {
  const [ingredientInput, setIngredientInput] = useState("")
  const [matchingIngredients, setMatchingIngredients] = useState([])
  const [allIngredients, setAllIngredients] = useState([])
  const [selectionIndex, setSelectionIndex] = useState(0)

  useEffect(() => {
    fetch("https://862840e1-6fa8-4a2d-a874-15705d2f04cb.mock.pstmn.io/get")
      .then(response => response.json())
      .then(( ingredients ) => setAllIngredients(ingredients));
  }, []);
  

  const handleChange = (event) => {
    setIngredientInput(event.target.value)
    if (event.target.value.length < 2) {
      setMatchingIngredients([])
    } else {
    const filter = allIngredients.filter(ingredient => {
      return ingredient.name.includes(event.target.value)
    })
    setMatchingIngredients(filter)
  }}

  const handleClick = (selectionIndex) => {
    if (!ingredientInput) return;
    const ingredientName = matchingIngredients[selectionIndex].name
    addIngredient(ingredientName);
    setIngredientInput("");
    setMatchingIngredients([]);
    setSelectionIndex(0)
  }

  const handleKeyDown = (event) => {
    const enterKeyCode = 13;
    const downKeyCode = 40;
    const upKeyCode = 38;
    if (event.keyCode === enterKeyCode) handleClick(selectionIndex);
    if (event.keyCode === downKeyCode) setSelectionIndex(selectionIndex + 1);
    if (event.keyCode === upKeyCode) setSelectionIndex(selectionIndex - 1);
    document.getElementsByClassName("active")[0].focus()

  }

  return (
    <div className="add-ingredient-container">
      <input type="text" id="ingredient-input" onChange={handleChange} onKeyDown={handleKeyDown} value={ingredientInput} placeholder="Enter Ingredient" />
      <ul className="matching-ingredients-list">
        {matchingIngredients.map((ingredient, i) => {
          let activeClassName
          if (i === selectionIndex) {
            activeClassName = "active"
          }
          return (<li key={i} onClick={handleClick} className={activeClassName} tabIndex="-1">{ingredient.name}</li>)
        })}
      </ul>
    </div>
  )
}

export default AddIngredient