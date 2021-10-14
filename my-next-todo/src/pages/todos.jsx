import { useState, useEffect } from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Checkbox } from "@material-ui/core";
import MoreVert from "@bit/mui-org.material-ui-icons.more-vert";
import { db } from '../../lib/db';
// import { collection as liteCollection, getDocs } from 'firebase/firestore/lite';
import { doc, onSnapshot, collection, getDocs } from "firebase/firestore";

export default function Home() {
    const [todos, setTodos] = useState([]);

    const fetchButton = async () => {
        const querySnapshot = await getDocs(liteCollection(db, "todos"));

        const _todos = [];
        querySnapshot.forEach((doc) => {
            _todos.push({
                ...doc.data()
            });
        });
        setTodos(_todos)
    };

    useEffect(() => {
            const f = async () => {
                const querySnapshot = await getDocs(collection(db, "todos"));
                const docIds = [];
                querySnapshot.forEach((doc) => {
                    docIds.push({
                        id: doc.id
                    });
                });
                
                docIds.forEach((docId) => {
                    const unsub = onSnapshot(doc(db, "todos", docId.id), (doc) => {
                        console.log("Current data: ", doc.data());
                    });
                });
            };
        f();
    }, []);

    // useEffect(() => {
    //     const unsub = onSnapshot(doc(db, "todos", "AYxKzrduqWkOfbZzI1oG"), (doc) => {
    //         console.log("Current data: ", doc.data());
    //     });
    // },[]);
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
            <button>取得</button>
            <div>{todoListItems}</div>
            </List>
        </>
    )
}