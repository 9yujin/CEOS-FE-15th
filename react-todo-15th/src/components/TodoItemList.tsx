import { useContext } from 'react';
import { TodoContext } from '../context/todoProvider';
import TodoItem from './TodoItem';
import { List } from '../styles/Container';

interface ITodoItemListProps {
    done: Boolean;
}

const TodoItemList = ({ done }: ITodoItemListProps) => {
    const { list } = useContext(TodoContext);
    const sectionList = list.filter((item) => item.done === done);

    return (
        <>
            <h4>
                {done ? 'DONE' : 'TO DO'} <span style={{ color: '#8989bb' }}>({sectionList.length})</span>
            </h4>
            <List>
                {sectionList.map((item) => (
                    <TodoItem item={item} key={item.id} />
                ))}
            </List>
        </>
    );
};

export default TodoItemList;
