import { app } from '../../lib/firebase';
import 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();

    const handleSignUp = async (event) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        const auth = getAuth(app);
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                email.value,
                password.value
            )
            alert(`会員登録完了しました。\n\nメールアドレス：${email.value}\nパスワード：********`)
            router.push('/todos')
        }catch (error) {
            alert("登録エラー")
            console.log(error);
        }
    }
    return (
        <form style={{marginTop: '150px'}} onSubmit={handleSignUp}>
            <div>
                <label>Enter your email:</label>
                <input name="email" type="email"/>
            </div>
            <div>
                <label>Enter your passoword:</label>
                <input name="password" type="password"/>
            </div>
            <div>
                <label></label>
                <input type="submit" value="Sign up"/>
            </div>
        </form>
    )
}
