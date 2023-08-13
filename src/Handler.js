import { useState } from "react"

const Handler = () => {
    const [items, setItems] = useState([]);
    const [text, setText] = useState("");

    const done = "done";
    const all = "all";
    const undone = "undone";
    

    const clickHandle = (event) =>{
        event.preventDefault();
        setItems(currentItems =>{
            return [
                ...currentItems,
                {text:text, id:crypto.randomUUID(), completed:false}
            ]
        })
        setText("");
    }

    const toggleCheck = (id) =>{
        setItems(currentItems =>{
            return currentItems.map(todo =>{
                if (todo.id === id){
                    return {...todo, completed:!todo.completed}
                }
                return todo
            })
        })
    }

    const deleteBtn = (id) =>{
        setItems(items.filter(todo => todo.id !== id))
    }


    return (
    <>
    <h1 className="page-title">Todo App</h1>

    <form onSubmit={(event) => {clickHandle(event)}} className="input">
        <input
        className="input-box"
        value={text} 
        onChange={(event) => setText(event.target.value)} 
        type="text" />

        <button className="input-btn">Add</button>
    </form>

    <div className="items-container">
        <ul className="items-list-container">
            {items.map((todo) => (
                <li className="items-list-item" key={todo.id}>
                    <input
                    className="list-checkbox"
                    checked={todo.completed} 
                    onChange={() => toggleCheck(todo.id)}
                    type="checkbox"/>
                    <input
                    className="list-input" 
                    style={{textDecoration: `${todo.completed ? "line-through" : "none"}`}} defaultValue={todo.text}/>
                    <button onClick={() => deleteBtn(todo.id)} className="delete-btn">X</button>
                </li>
            ))}
        </ul>
    </div>

    </>
    )
}

export default Handler