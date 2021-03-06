import { app } from '../../../lib/firebase';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore";
import Link from 'next/link';
import { Grid } from '@material-ui/core'
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useState } from 'react';


/* ・TODOタイトル候補<br />
・TODO作成 */

export default function Home() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const db = getFirestore(app);

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
            <Grid container justifyContent="center" >
                <Grid sm={8}>
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
