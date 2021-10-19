import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { useAuth } from "../lib/AuthContext";

export default function Home() {
  const { currentUser, login, logout } = useAuth()

  const handleLoginButton = () => {
    login()
  }

  const handleLogoutButton = () => {
    logout()
  }

  return (
    <div className={styles.container}>
      {currentUser &&
        <div>
          <h2>ログインしています.</h2>
          <button onClick={handleLogoutButton}>ログアウト</button>
        </div>
      }
      {!currentUser &&
        <div>
          <h2>ログインしていません.</h2>
          <button onClick={handleLoginButton}>ログイン</button>
        </div>
      }
      <Head>
        <title>SimpleTodo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    </div>
  )
}
