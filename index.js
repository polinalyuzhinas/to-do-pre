let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	if (localStorage) {
		return JSON.parse(localStorage.getItem("tasksList"));
	}
	items.forEach (function(task) {
		items.push(task);
	});
	return items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	deleteButton.addEventListener("click", function(event) {
		clone.remove();
		saveTasks(getTasksFromDOM());
	});
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	duplicateButton.addEventListener("click", function(event) {
		// const itemName = textElement.textContent;
		const newItem = createItem(item);
		listElement.prepend(newItem);
		saveTasks(getTasksFromDOM());
	});
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
	editButton.addEventListener("click", function(event) {
		textElement.setAttribute("contenteditable", "true");
		textElement.focus();
	});
	textElement.addEventListener("blur", function(event) {
		textElement.setAttribute("contenteditable", "false");
		saveTasks(getTasksFromDOM());
	});
	textElement.textContent = item;
	return clone;
}

formElement.addEventListener("submit", function(event) {
	event.preventDefault();
	listElement.prepend(createItem(inputElement.value));
	items = getTasksFromDOM();
	saveTasks(items);
	formElement.reset();
});

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	const tasks = [];
	itemsNamesElements.forEach (function(task) {
		tasks.push(task.textContent);
	});
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem("tasksList", JSON.stringify(tasks));
}

items = loadTasks();
items.forEach (function(task) {
	listElement.append(createItem(task));
});