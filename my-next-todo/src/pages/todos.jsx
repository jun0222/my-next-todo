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
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { Link as MuiLink } from '@mui/material';

export default function Home() {
    const [todos, setTodos] = useState([]);
    const db = getFirestore(app);
    const [isSignedIn, setIsSignedIn] = useState();
    const [userEmail, setUserEmail] = useState('');
    const auth = getAuth(app);

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
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsSignedIn(true);
                setUserEmail(user.email);
            } else {
                setIsSignedIn(false);
                setUserEmail('');
            }
        })
    }, []);
    return (
        <>
        <Grid container justifyContent="center" >
            <Grid sm={8}>
            <List>
                <ListItem>
                    {isSignedIn ? (
                        <div>
                            <span>{userEmail}さんこんにちは！</span>
                            <span>
                                <Link href={`/mypage`} >
                                    <MuiLink color="inherit" style={{cursor: "pointer"}}>マイページ</MuiLink>
                                </Link>
                            </span>
                        </div>
                    ):(
                        <div>
                            <span>ゲストさんこんにちは！</span>
                            <span>
                                <Link href={`/signin`} >
                                    <MuiLink color="inherit" style={{cursor: "pointer"}}>ログインする</MuiLink>
                                </Link>
                            </span>
                        </div>
                    )}
                </ListItem>
            </List>
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