import React, { useEffect, useState } from 'react'
import "./Main.css"
import Todo from './Todo'

function Main() {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleLoadItems = async () => {
        setIsLoading(true)
        try {
            const res = await fetch("http://localhost:3030/jsonstore/todos")
            const json = await res.json()
            const data = Object.entries(json)
            setItems(data)
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        handleLoadItems()
    }, [])
    return (
        <main className="main">

            <section className="todo-list-container">
                <h1>Todo List</h1>

                <div className="add-btn-container">
                    <button className="btn">+ Add new Todo</button>
                </div>

                <div className="table-wrapper">

                    {isLoading && <div className="loading-container">
                        <div className="loading-spinner">
                            <span className="loading-spinner-text">Loading</span>
                        </div>
                    </div>}


                    <table className="table">
                        <thead>
                            <tr>
                                <th className="table-header-task">Task</th>
                                <th className="table-header-status">Status</th>
                                <th className="table-header-action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((i) => <Todo data={i}/>)}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}

export default Main