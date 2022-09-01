import TodoProvider from './context/todoProvider';
import GlobalStyle from './styles/GlobalStyle';
import { Main, Section } from './styles/Container';
import { ToastComponent } from './components/toast/Toast';
import InputTodo from './components/InputTodo';
import TodoItemList from './components/TodoItemList';

function App() {
    return (
        <TodoProvider>
            <GlobalStyle />
            <Main>
                <Section>
                    <h1>투두 리스트</h1>
                    <InputTodo />
                </Section>
                <Section>
                    <TodoItemList done={false}></TodoItemList>
                </Section>
                <Section>
                    <TodoItemList done={true}></TodoItemList>
                </Section>
                <ToastComponent />
            </Main>
        </TodoProvider>
    );
}

export default App;
