import {memo} from "react";

function Todos({todos, addTodo}) {
    console.log("child Todos render")
    console.log("1-", todos)
    return (
        <>
            <h2>My Todos</h2>
            {todos.map((t, i) => {
                return <p key={i}>{t}</p>
            })}
            <button onClick={addTodo}>Add Todo</button>
        </>
    )
}
export default  memo(Todos)