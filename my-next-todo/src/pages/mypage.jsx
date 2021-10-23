import { app } from '../../lib/firebase';
import 'firebase/auth';
import {useState, useEffect} from 'react';
import {getAuth, signOut, onAuthStateChanged} from 'firebase/auth';
import { useRouter } from "next/router";

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
            <div>
                <p>メールアドレス：{userEmail}</p>
                <form onSubmit={handleSignOut} >
                    <input type="submit" value="sign out" />
                </form>
            </div>
        </>
    )
}
