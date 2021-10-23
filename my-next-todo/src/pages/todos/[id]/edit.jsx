import { app } from '../../../../lib/firebase';
import { getFirestore } from 'firebase/firestore';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { Grid } from '@material-ui/core'
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

export default function Home() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    const id = router.asPath.split('/')[2];
    const db = getFirestore(app);

    // idを元にタイトルと本文を取得。
    const getDefaultValue = async () =>{
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
        getDefaultValue()
    },[id]);

    // ボタンクリック時にfirestoreのデータを更新する。
    const updateTodosTask = async () => {
        if (title === ""){
            window.alert('タイトルが未入力です')
            return
        };
        if (content === "" ){
            window.alert('内容が未入力です')
            return
        };

        const washingtonRef = doc(db, "todos", id);
    
        await updateDoc(washingtonRef, {
            title: title,
            content: content
        });

        window.alert(`以下の内容で登録しました。\n\nタイトル：${title}\n内容：${content}`);
    }

    // updateTodosTaskで使うためにinputへ入力した値を取得。
    const getInputTextForTitle = (event) => setTitle(event.target.value);
    const getInputTextForContent = (event) => setContent(event.target.value);

    return (
        // todo:ドキュメントIDをurlに入れるので、userが一致していないとリダイレクトするようにする！
        <div>
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
                    onClick={updateTodosTask}
                >更新</Button>
                <Button
                    variant="contained"
                    type="submit"
                    margin="normal"
                >
                    <Link href={`/todos/${id}`}>
                        戻る
                    </Link>
                </Button>
                </Grid>
            </Grid>
        </div>
    )
}
