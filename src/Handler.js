import { useState, useEffect } from "react";
import { AiOutlinePlusCircle, AiOutlineDelete } from "react-icons/ai";

const Handler = () => {
    const [items, setItems] = useState([]);
    const [text, setText] = useState("");

    useEffect(() =>{
        const data = localStorage.getItem("ITEMS_TODO_LIST");
        if (data !== null) {
            setItems(currentItems =>{
                if (currentItems === JSON.parse(data)){
                    return [ ...JSON.parse(data)]
                } else{
                    return [
                        ...currentItems,
                        ...JSON.parse(data)
                    ]
                }
            })
        }else{
            return
        }
            
    }, [])
    
    useEffect(() => {
        localStorage.setItem("ITEMS_TODO_LIST", JSON.stringify(items));
    }, [items])

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
    <div className="handler">
        <h1 className="page-title">Todo App</h1>

        <form onSubmit={(event) => {clickHandle(event)}} className="input">
            <input
            title="input-box"
            className="input-box"
            value={text} 
            onChange={(event) => setText(event.target.value)} 
            type="text" />

            <button title="add" className="input-btn"><AiOutlinePlusCircle size={30} /></button>
        </form>

        <div className="items-container">
            <ul className="items-list-container">
                {items.map((todo) => (
                    <li className="items-list-item" key={todo.id}>
                

                        <label class="container">
                            <input
                            title="list-checkbox"
                            className="list-checkbox"
                            checked={todo.completed} 
                            onChange={() => toggleCheck(todo.id)}
                            type="checkbox" />
                            <span class="checkmark"></span>
                        </label>

                        <input
                        title="list-input"
                        className="list-input" 
                        style={{textDecoration: `${todo.completed ? "line-through" : "none"}`}} defaultValue={todo.text}/>


                        <button title="delete-btn" onClick={() => deleteBtn(todo.id)} className="delete-btn"><AiOutlineDelete size={30} /></button>
                    </li>
                ))}
            </ul>
        </div>

    </div>
    )
}

export default Handler