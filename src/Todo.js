import { Button, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'
import { db } from './firebase_config'

function TodoListItem({todo,in_progress,id}) {

    // Updating the Database
        function toggleInProgress(){
            db.collection("todos").doc(id).update({
                in_progress: !in_progress
            })
        }

function deleteTodo(){
            db.collection("todos").doc(id).delete();
}


    return (
        <div style={{display:"flex",
        textAlign:"center"}}>
            <ListItem>
                <ListItemText primary ={todo}
                    style={{
                        
                        justifyContent:"center",
                        alignItems:"center"
                        }} 
                    secondary ={in_progress?'In progress':"Task Completed"}
                />
            </ListItem>

            <Button onClick={toggleInProgress}>
            {in_progress?'Done':"Undone"}
            </Button>
            <Button onClick={deleteTodo}>
                Delete
            </Button>
        </div>
    )
}

export default TodoListItem
