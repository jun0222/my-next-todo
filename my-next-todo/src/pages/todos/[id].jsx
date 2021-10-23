import { app } from '../../../lib/firebase';
import { getFirestore } from 'firebase/firestore';
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { Grid } from '@material-ui/core';
import { Button } from "@material-ui/core";

export default function Home() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    const id = router.asPath.split('/')[2];
    const db = getFirestore(app);

    // idを元にタイトルと本文を取得。
    const getValue = async () =>{
        if (router.asPath !== router.route) {
            const docRef = doc(db, "todos", id);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                setTitle(docSnap.data().title);
                setContent(docSnap.data().content);
            }
        }
    }
    useEffect(() => {
        getValue()
    },[id]);

    // タスクを削除する関数
    const deleteTodosTask = async () => {
        await deleteDoc(doc(db, "todos", id));
        window.alert(`タスクを削除しました`);
        router.push('/todos')
    }

    return (
        // todo:ドキュメントIDをurlに入れるので、userが一致していないとリダイレクトするようにする！
        <>
        <div>
            <Grid container>
                <Grid sm={2}/>
                <Grid lg={8} sm={8} spacing={10}>
                <h1>{title}</h1>
                <p>{content}</p>
                <Link href={`/todos/${id}/edit`}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        margin="normal"
                    >
                        編集
                    </Button>
                </Link>
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    margin="normal"
                    onClick={deleteTodosTask}
                >削除</Button>
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
        </div>
        </>
    )
}
