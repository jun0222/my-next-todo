import { Grid } from '@material-ui/core'
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useState } from 'react';
import Link from 'next/link';

/* ・TODOタイトル候補<br />
・TODO作成 */

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState({});
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const addTaskToTodos = () => {
        setTodo(todo.title = title);
        setTodo(todo.content = content);

        const newTodos = [...todos, todo];
        setTodos(newTodos);

        setTodo({});
        setTitle('');
        setContent('');
    }

    const getInputTextForTitle = (event) => setTitle(event.target.value);
    const getInputTextForContent = (event) => setContent(event.target.value);

    return (
        <>
            <Grid container>
                <Grid sm={2}/>
                <Grid lg={8} sm={8} spacing={10}>
                <TextField
                    placeholder="タイトル"
                    margin="normal"
                    value={title}
                    onChange={getInputTextForTitle}
                />
                <TextField
                    placeholder="内容"
                    margin="normal"
                    fullWidth
                    value={content}
                    onChange={getInputTextForContent}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    margin="normal"
                    onClick={addTaskToTodos}
                >追加</Button>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    margin="normal"
                >
                    <Link href="/todos">
                        todo一覧へ
                    </Link>
                </Button>
                {todos.map((todo, index)=>{
                    return (
                        <p>{`${todo.title}:${todo.content}`}</p>    
                    )
                })}
                </Grid>
            </Grid>
        </>
    )
}
