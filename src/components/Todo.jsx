import React, { useState } from 'react'

function Todo({ data }) {
    const [todo, setTodo] = useState(data[1])
    const id = data[0]
    const handleEditTodo = async (complete, id) => {
        complete = !complete
        const body = {
            isCompleted: complete
        }
        const res = await fetch("http://localhost:3030/jsonstore/todos/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(body)
        })
        const data = await res.json(res)
        setTodo(data)
    }
    return (
        <tr className={"todo " + (todo.isCompleted === true ? "is-completed" : "")}>
            <td>{todo.text}</td>
            <td>{todo.isCompleted ? "Completed" : "Not Completed"}</td>
            <td className="todo-action">
                <button className="btn todo-btn" onClick={() => handleEditTodo(todo.isCompleted, id)}>Change status</button>
            </td>
        </tr>
    )
}

export default Todo