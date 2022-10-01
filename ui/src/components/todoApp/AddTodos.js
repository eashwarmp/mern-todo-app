import React, { useState } from "react";
import axios from "axios";

const AddTodos = (props) => {
    const [todo, setTodo] = useState('')
    const [priority, setPriority] = useState('')
    const [completion, setCompletion] = useState('')

    // Submit the form
    const submitTodo = (e) => {
        e.preventDefault();
        if (todo && priority && completion) {
            console.log(props)
            
            todoServiceCall();
        }
        console.log(e);
    }

    //The todo is added through the POST Service Call
    const todoServiceCall = async () => {
        let reqData = {
            todo,
            completed: completion,
            priority,
            profileId: "901"
        }
        try {
            let response = await axios.post('http://localhost:8080/todos', reqData)
             console.log(response)       
        } catch(e) {
            console.log('Error------------->',e) 
        }
        props.checkSomething('true');
    }


    return (
        <>
        <div class="col-12" style={{marginTop:"30px"}}>
            <h3>Add your new todos here:</h3>
        </div>
        <form>
            <div class="row" style={{marginTop:"30px"}}>
                <div class="col-4">
                    <label><strong>Todo:</strong></label>
                    <input id="todoVal" type="text" onChange={(e) => setTodo(e.target.value)} name="todo" value={todo}  />
                </div>
                <div class="col-4">
                    <label><strong>Priority:</strong></label>
                    <select name="Priority" value = {priority} onChange={(e) => setPriority(e.target.value)} id="select_priority">
                        <option value="">--Please choose the level of importance--</option>
                        <option value="Important" >Important</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select> 
                </div>
                <div class="col-4">
                    <label><strong>Completion:</strong></label>
                    <select name="Completion" value={completion} onChange={(e) => setCompletion(e.target.value)} id="select_completion">
                        <option value="">--Status of Completion--</option>
                        <option value="true" >true</option>
                        <option value="false">false</option>
                    </select>
                </div>
            </div>
            <div class="col-12" style={{marginTop:"20px"}}>
                <input type="submit" onClick={(e) => submitTodo(e)} onSubmit={(e) => submitTodo(e)} value="Submit form" />
            </div>
        </form>
        </>
    )
}

export default AddTodos;