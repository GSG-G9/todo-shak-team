const ulContainer = document.getElementById('myUL');
const todoTextContent = document.getElementById('myInput');
const addTodoButton = document.getElementById('addTodoButton');
const todoErr = document.getElementById('todoErr');
const logoutButton = document.getElementById('logoutButton');
const userNameSpan = document.getElementById('userNameSpan');

const getTodos = () => {
	fetch('/todos')
		.then((results) => results.json())
		.then(({ data, status }) => {
			if (status !== 200) throw new Error();
			return ulContainer.append(
				...data.map((todo) => createTodo(todo.text_content,todo.todo_id))
			);
		})
		.catch((err) => {
			window.location.href = '../html/404.html';
		});
};

const addTodo = () => {
	fetch('/todo', {
		headers: {
			'content-type': 'application/json',
		},
		method: 'post',
		body: JSON.stringify({
			text_content: todoTextContent.value,
		}),
	})
		.then(({ status }) => {
			if (status !== 200) throw new Error();
			window.location.reload();
		})
		.catch(() => {
			window.location.href = '../html/500.html';
		});
};

const deleteTodo = (id) => {
	fetch('todo', {
		method: 'delete',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			todoId: id,
		}),
	})
		.then(({ status }) => {
			if (status !== 200) throw new Error();
			window.location.reload();
		})
		.catch(() => {
			window.location.href = '../html/500.html';
		});
};

const createTodo = (textContent,todoId) => {
	const li = document.createElement('li');
	const span = document.createElement('span');
	span.addEventListener('click',()=>{
		deleteTodo(todoId)
	})
	li.innerText = textContent;
	li.classList.add('item');
	span.innerText = 'X';
	span.classList.add('close');
	li.append(span);
	return li;
};

const checkTodoTextContent = function() {
  if (todoTextContent.validity.typeMismatch) {
    displayErr(todoErr, "Please enter a valid todo text content");
  } else if (todoTextContent.validity.valueMissing) {
    displayErr(todoErr, "Please enter a valid todo text content");
  } else if (todoTextContent.validity.tooShort ||todoTextContent.validity.tooLong ){
    displayErr(todoErr, "Please enter a valid user name length 3 - 250 characters");
  }  else {
    displayErr(todoErr, "");
    return true;
  }
};

function displayErr(errElem, errMsg) {
  errElem.innerText = errMsg;
}

const logoutFunction = ()=>{
	console.log('logout')
	fetch('/logout')
		.then((res)=>res.json())
		.then(({status})=> {
			if (status!==200) throw new Error('')
			window.location.href = '/login'
		}).catch((err)=> {
			window.location.href = '../html/500.html'
		})
}


const getUserName = ()=>{
	fetch('/user')
		.then(res => res.json())
		.then(({data,status})=>{
			if (status !== 200) throw new Error('');
			userNameSpan.innerText = data
		}).catch(()=>{
			window.location.href = '../html/500.html'
		})
}
window.addEventListener('load', getTodos);
window.addEventListener('load', getUserName);
addTodoButton.addEventListener('click', (event)=>{
	if(!checkTodoTextContent())	return event.preventDefault()
	addTodo()
});

logoutButton.addEventListener('click',logoutFunction)





