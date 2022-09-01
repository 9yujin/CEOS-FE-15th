let todoArr = [];
let doneArr = [];

/*로컬 스토리지에서 가져오기 함수*/
const getLocalStorage = () => {
    const localTodo = window.localStorage.getItem('todo');
    const localDone = window.localStorage.getItem('done');
    console.log(localTodo, localDone);

    //로컬스토리지에 데이터가 있을때에만 가져온다
    if (localTodo) {
        todoArr = JSON.parse(localTodo);
        todoArr.map((v) => createTodoElement(v, 'todo'));
    }
    if (localDone) {
        doneArr = JSON.parse(localDone);
        doneArr.map((v) => createTodoElement(v, 'done'));
    }
};

//현재 배열을 로컬스토리지로 동기화
const syncLocalStorage = () => {
    window.localStorage.clear();
    window.localStorage.setItem('todo', JSON.stringify(todoArr));
    window.localStorage.setItem('done', JSON.stringify(doneArr));
    console.log('sync');
};

/*아이템 생성하기 함수*/
const createTodoElement = (content, isItToDo) => {
    const todoList = document.getElementById('todo-list');
    const doneList = document.getElementById('done-list');

    const item = document.createElement('li');
    item.className = 'item ';
    item.className += isItToDo;

    const itemContent = document.createElement('div');
    itemContent.className = 'item-content';
    itemContent.innerHTML = content;

    const radioButton = document.createElement('div');
    radioButton.className = 'radio-button';

    const itemRemove = document.createElement('button');
    itemRemove.className = 'item-remove';

    const itemContentBox = document.createElement('div');
    itemContentBox.className = 'item-content-box';

    itemContentBox.appendChild(radioButton);
    itemContentBox.appendChild(itemContent);

    item.appendChild(itemContentBox);
    item.appendChild(itemRemove);

    if (isItToDo === 'todo') {
        todoList.appendChild(item);
    } else {
        doneList.appendChild(item);
    }
    countTodo();

    //삭제 버튼 함수
    const removeTodo = () => {
        if (isItToDo === 'todo') {
            todoArr = todoArr.filter((v) => v !== content);
        }
        if (isItToDo === 'done') {
            doneArr = doneArr.filter((v) => v !== content);
        }
        item.remove();
        syncLocalStorage();
        countTodo();
        toast('삭제되었어요!');
    };
    itemRemove.onclick = removeTodo;

    //할일 토글 함수
    const toggleTodo = () => {
        if (isItToDo === 'todo') {
            todoArr = todoArr.filter((v) => v !== content);
            doneArr.push(content);
        }
        if (isItToDo === 'done') {
            doneArr = doneArr.filter((v) => v !== content);
            todoArr.push(content);
        }

        //현재 배열을 로컬스토리지에 최신화합니다.
        syncLocalStorage();

        // 화면에 보이는 요소들을 모두 지우고, 다시 로컬스토리지에서 불러옵니다.
        while (todoList.firstChild) {
            todoList.removeChild(todoList.lastChild);
        }
        while (doneList.firstChild) {
            doneList.removeChild(doneList.lastChild);
        }
        getLocalStorage();
    };
    itemContent.onclick = toggleTodo;
    radioButton.onclick = toggleTodo;
};

//엔터키로 추가 가능
const enterPush = () => {
    if (window.event.keyCode == 13) {
        pushTodo();
    }
};

//새 할일 추가하기 함수
const pushTodo = () => {
    const input = document.getElementById('input-form');
    if (todoArr.indexOf(input.value) == -1 && doneArr.indexOf(input.value) == -1) {
        //해당하는 값이 없을때만 추가!! : 이름이 같으면 토글할때 문제가 생기던데
        if (input.value.length > 0) {
            todoArr.push(input.value);
            window.localStorage.setItem('todo', JSON.stringify(todoArr));
            createTodoElement(input.value, 'todo');
        }
    } else {
        toast('동일한 내용으론 작성할 수 없어요!');
    }
    input.value = null;
};

//투두 개수 카운팅
const countTodo = () => {
    const todo = document.getElementById('todo-count');
    const done = document.getElementById('done-count');
    todo.innerHTML = '(' + todoArr.length + ')';
    done.innerHTML = '(' + doneArr.length + ')';
};

//토스트 알림
const toast = (string) => {
    const toast = document.getElementById('toast');

    if (toast.classList.contains('reveal')) {
        clearTimeout(removeToast);
        removeToast = setTimeout(function () {
            document.getElementById('toast').classList.remove('reveal');
        }, 1000);
    } else {
        removeToast = setTimeout(function () {
            document.getElementById('toast').classList.remove('reveal');
        }, 1000);
    }

    toast.classList.add('reveal');
    toast.innerText = string;
};

window.onload = getLocalStorage();
