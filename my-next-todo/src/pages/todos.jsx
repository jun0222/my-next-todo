import { useState } from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Checkbox } from "@material-ui/core";
import MoreVert from "@bit/mui-org.material-ui-icons.more-vert";
import { db } from '../../lib/db';
import { collection, getDocs } from 'firebase/firestore/lite';


export default function Home() {
    const [todos, setTodos] = useState([]);

    const fetchButton = async () => {
        const querySnapshot = await getDocs(collection(db, "todos"));

        const _todos = [];
        querySnapshot.forEach((doc) => {
            _todos.push({
                ...doc.data()
            });
        });
        setTodos(_todos)
    };
    const todoListItems = todos.map(todo => {
        return (
            // keyを設定していないので、idなどを作り設定予定
            <ListItem>
                <Checkbox />
                <ListItemText primary={`${todo.title}：${todo.content}`} />
                <MoreVert />
            </ListItem>
        )
    })
    return (
        <>
            <List component="nav">
            <button onClick={fetchButton}>取得</button>
            <div>{todoListItems}</div>
            </List>
        </>
    )
}