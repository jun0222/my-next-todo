import { app } from '../../lib/firebase';
import { getFirestore } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Checkbox, Button } from "@material-ui/core";
import MoreVert from '@mui/icons-material/MoreVert';
import { onSnapshot, collection, getDocs, query } from "firebase/firestore";
import Link from 'next/link';
import { Grid } from '@material-ui/core';

export default function Home() {
    const [todos, setTodos] = useState([]);
    const db = getFirestore(app);

    useEffect(() => {
            const f = async () => {
                const querySnapshot = await getDocs(collection(db, "todos"));
                const q = query(collection(db, "todos"));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const newTodos = [];
                    querySnapshot.forEach((doc) => {
                        newTodos.push({
                            id: doc.id,
                            title: doc.data().title,
                            content: doc.data().content
                        });
                    });
                    setTodos(newTodos);
                });
            };
        f();
    }, []);

    const todoListItems = todos.map(todo => {
        return (
            <ListItem key={todo.id}>
                <Checkbox />
                <ListItemText primary={`${todo.title}：${todo.content}`} />
                    <Link href={`/todos/${todo.id}`}>
                        <MoreVert style={{cursor: "pointer"}} />
                    </Link>
            </ListItem>
        )
    })
    return (
        <>
        <Grid container>
            <Grid sm={2}/>
            <Grid lg={8} sm={8} spacing={10}>
            <List component="nav">
                {todoListItems}
            </List>
            <Link href={`/todos/create`}>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    margin="normal"
                >
                    新規作成
                </Button>
            </Link>
            </Grid>
        </Grid>
        </>
    )
}