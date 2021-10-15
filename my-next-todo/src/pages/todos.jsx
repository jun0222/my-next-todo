import { useState, useEffect } from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Checkbox } from "@material-ui/core";
import MoreVert from "@bit/mui-org.material-ui-icons.more-vert";
import { db } from '../../lib/db';
import { onSnapshot, collection, getDocs, query } from "firebase/firestore";
import Link from 'next/link';

export default function Home() {
    const [todos, setTodos] = useState([]);

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
            // keyを設定していないので、idなどを作り設定予定
            <ListItem>
                <Checkbox />
                <ListItemText primary={`${todo.id}：${todo.title}：${todo.content}`} />
                    <Link href={`/todos/${todo.id}`}>
                        todo詳細へ
                    </Link>
                <MoreVert />
            </ListItem>
        )
    })
    return (
        <>
            <List component="nav">
                {todoListItems}
            </List>
        </>
    )
}