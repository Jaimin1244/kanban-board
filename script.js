const lists = ['todo', 'inprogress', 'done'];

lists.forEach(id => {
  new Sortable(document.getElementById(id), {
    group: 'kanban',
    animation: 200,
    ghostClass: 'opacity-50',
    dragClass: 'bg-opacity-80',
    onAdd: function (evt) {
      updateCardColor(evt.item, id);
      updateTaskIcon(evt.item, id);
    }
  });
});

function addTask() {
  const taskText = prompt("Enter your task:");
  if (taskText && taskText.trim() !== "") {
    const taskCard = document.createElement("div");
    taskCard.className = getCardClass('todo');
    taskCard.innerHTML = `<i class="bi bi-pin-angle-fill mr-2"></i>${taskText}`;
    document.getElementById('todo').appendChild(taskCard);
  }
}

function getCardClass(listId) {
  let colorClass = "";
  if (listId === "todo") colorClass = "bg-blue-100";
  else if (listId === "inprogress") colorClass = "bg-yellow-100";
  else if (listId === "done") colorClass = "bg-green-100";

  return `${colorClass} p-3 rounded-xl shadow-md cursor-move flex items-center`;
}

function updateCardColor(card, listId) {
  card.classList.remove("bg-blue-100", "bg-yellow-100", "bg-green-100");
  if (listId === "todo") card.classList.add("bg-blue-100");
  else if (listId === "inprogress") card.classList.add("bg-yellow-100");
  else if (listId === "done") card.classList.add("bg-green-100");
}

function updateTaskIcon(card, listId) {
  const iconEl = card.querySelector("i");

  if (!iconEl) return;

  iconEl.classList.remove("bi-pin-angle-fill", "bi-arrow-repeat", "bi-check2-circle");

  if (listId === "todo") iconEl.classList.add("bi-pin-angle-fill");
  else if (listId === "inprogress") iconEl.classList.add("bi-arrow-repeat");
  else if (listId === "done") iconEl.classList.add("bi-check2-circle");
}
