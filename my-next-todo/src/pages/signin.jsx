import { app } from '../../lib//firebase';
import 'firebase/auth';
import {useState, useEffect} from 'react';
import {getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import { useRouter } from "next/router";
import { Grid } from '@material-ui/core';
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

export default function Home() {
    const [isSignedIn, setIsSignedIn] = useState();
    const auth = getAuth(app);
    const router = useRouter();

    const handleSignIn = async (event) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await signInWithEmailAndPassword(auth, email.value, password.value)
            console.log(email.value, password.value)
            router.push('/todos');
        }catch (error) {
            console.log(error.message);
            alert("sign in error!!")
        }
    }
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
                setIsSignedIn(true);
                console.log(user);
            } else {
                setIsSignedIn(false);
                console.log('User is signed out');
            }
        })
    }, []);
    return (
        <>
        <Grid container justifyContent="center" >
            <Grid sm={4}>
                <div>
                    {isSignedIn ? (
                        <></>
                    ):(
                        <form style={{marginTop: '150px'}} onSubmit={handleSignIn}>
                            <div>
                                <TextField
                                    fullWidth
                                    placeholder="メールアドレス"
                                    margin="normal"
                                    name="email"
                                    type="email"
                                />
                            </div>
                            <div>
                                <TextField
                                    fullWidth
                                    placeholder="パスワード"
                                    margin="normal"
                                    name="password"
                                    type="password"
                                />
                            </div>
                            <div>
                                <label></label>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    margin="normal"
                                >
                                    ログイン
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </Grid>
        </Grid>
        </>
    )
}
