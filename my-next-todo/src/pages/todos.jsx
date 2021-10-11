import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Checkbox } from "@material-ui/core";
import MoreVert from "@bit/mui-org.material-ui-icons.more-vert";
import { db } from '../../lib/db';
import { collection, getDocs } from 'firebase/firestore/lite';

async function getTodos(db) {
    const todosCol = collection(db, 'todos');
    const todoSnapshot = await getDocs(todosCol);
    const todoList = todoSnapshot.docs.map(doc => doc.data());
    console.log(todoList)
    return todoList;
}

export default function Home() {
    const handleClickFetchButton = () => {
        console.log(getTodos(db))
        console.log(process.env)
    }
    return (
        <>
            <List component="nav">
                <button onClick={handleClickFetchButton}>取得</button>
                {/* {todos.map((todo, index)=>{
                    return (
                        <ListItem>
                            <Checkbox />
                            <ListItemText primary={`${todo.title}:${todo.content}`} />
                            <MoreVert />
                        </ListItem>
                    )
                })} */}
                <ListItem>
                    <Checkbox />
                    <ListItemText primary="TODO詳細遷移" />
                    <MoreVert />
                </ListItem>
                <ListItem>
                    <Checkbox />
                    <ListItemText primary="フィルター" />
                    <MoreVert />
                </ListItem>
                <ListItem>
                    <Checkbox />
                    <ListItemText primary="ソート" />
                    <MoreVert />
                </ListItem>
                <ListItem>
                    <Checkbox />
                    <ListItemText color="secondary" primary="メロスは激怒した。必ず、かの邪智暴虐じゃちぼうぎゃくの王を除かなければならぬと決意した。メロスには政治がわからぬ。メロスは、村の牧人である。笛を吹き、羊と遊んで暮して来た。けれども邪悪に対しては、人一倍に敏感であった。きょう未明メロスは村を出発し、野を越え山越え、十里はなれた此このシラクスの市にやって来た。メロスには父も、母も無い。女房も無い。十六の、内気な妹と二人暮しだ。この妹は、村の或る律気な一牧人を、近々、花婿はなむことして迎える事になっていた。結婚式も間近かなのである。メロスは、それゆえ、花嫁の衣裳やら祝宴の御馳走やらを買いに、はるばる市にやって来たのだ。先ず、その品々を買い集め、それから都の大路をぶらぶら歩いた。メロスには竹馬の友があった。セリヌンティウスである。今は此のシラクスの市で、石工をしている。その友を、これから訪ねてみるつもりなのだ。久しく逢わなかったのだから、訪ねて行くのが楽しみである。歩いているうちにメロスは、まちの様子を怪しく思った。ひっそりしている。もう既に日も落ちて、まちの暗いのは当りまえだが、けれども、なんだか、夜のせいばかりでは無く、市全体が、やけに寂しい。のんきなメロスも、だんだん不安になって来た。路で逢った若い衆をつかまえて、何かあったのか、二年まえに此の市に来たときは、夜でも皆が歌をうたって、まちは賑やかであった筈はずだが、と質問した。若い衆は、首を振って答えなかった。しばらく歩いて老爺ろうやに逢い、こんどはもっと、語勢を強くして質問した。老爺は答えなかった。メロスは両手で老爺のからだをゆすぶって質問を重ねた。老爺は、あたりをはばかる低声で、わずか答えた。" />
                    <MoreVert />
                </ListItem>
            </List>
        </>
    )
}