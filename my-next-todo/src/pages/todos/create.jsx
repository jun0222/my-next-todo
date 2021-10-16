import { Grid } from '@material-ui/core'
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useState } from 'react';
import Link from 'next/link';
import { db } from '../../../lib/db';
import { collection, addDoc } from "firebase/firestore";

/* ・TODOタイトル候補<br />
・TODO作成 */

export default function Home() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const addTaskToTodos = async () => {
        if (title === ""){
            window.alert('タイトルが未入力です')
            return
        };
        if (content === "" ){
            window.alert('内容が未入力です')
            return
        };

        // firestoreへデータを保存
        await addDoc(collection(db, "todos"), {
            title: title,
            content: content
        }, {merge: true});

        window.alert(`以下のタスクを登録しました。\n\nタイトル：${title}\n内容：${content}`);

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
                    type="submit"
                    margin="normal"
                >
                    <Link href="/todos">
                        戻る
                    </Link>
                </Button>
                </Grid>
            </Grid>
        </>
    )
}
