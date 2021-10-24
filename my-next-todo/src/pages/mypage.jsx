import { app } from '../../lib/firebase';
import 'firebase/auth';
import {useState, useEffect} from 'react';
import {getAuth, signOut, onAuthStateChanged} from 'firebase/auth';
import { useRouter } from "next/router";
import { Grid } from '@material-ui/core';
import { Button } from "@material-ui/core";
import Link from 'next/link';

export default function Home() {
    const auth = getAuth(app);
    const router = useRouter();
    const [userEmail, setUserEmail] = useState('');

    const handleSignOut = async (event) => {
        event.preventDefault();
        try {
            const result = await signOut(auth);
        }catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                router.push('/todos');
            }
        })
    }, []);

    return (
        <>
        <Grid container justifyContent="center" >
            <Grid sm={4}>
                <div>
                    <h2>プロフィール</h2>
                    <p>メールアドレス：{userEmail}</p>
                    <form onSubmit={handleSignOut} >
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            margin="normal"
                        >
                            ログアウト
                        </Button>
                        <Link href="/todos">
                            <Button
                                variant="contained"
                                margin="normal"
                            >
                                戻る
                            </Button>
                        </Link>
                    </form>
                </div>
            </Grid>
        </Grid>
        </>
    )
}
