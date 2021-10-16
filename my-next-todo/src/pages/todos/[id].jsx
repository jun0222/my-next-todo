import Link from 'next/link';
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();
    const todoId = router.query.id;

    return (
        // ドキュメントIDをurlに入れるので、userが一致していないとリダイレクトするようにする！
        <div>
            ・TODO削除<br />
            ・コメント投稿機能<br />
            <Link href={`/todos/${todoId}/edit`}>
                todo編集へ
            </Link>
        </div>
    )
}
