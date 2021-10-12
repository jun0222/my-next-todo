import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Checkbox } from "@material-ui/core";
import MoreVert from "@bit/mui-org.material-ui-icons.more-vert";
import { db } from '../../lib/db';
import { collection, getDocs } from 'firebase/firestore/lite';

const todos = [];

async function getTodosAll(db, todos) {
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
        const todo = {title: doc.data().title, content: doc.data().content};
        todos.push(todo);
        return todos;
    });
}
getTodosAll(db, todos);

export default function Home() {

    return (
        <>
            <List component="nav">
                {todos.map((todo, index)=>{
                    return (
                        <ListItem key={index}>
                            <Checkbox />
                            <ListItemText primary={`${todo.title}：${todo.content}`} />
                            <MoreVert />
                        </ListItem>
                    )
                })}
            </List>
        </>
    )
}