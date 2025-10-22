// Task Tracker (copied into docs/task-tracker)

const STORAGE_KEY = 'task-tracker-tasks-v1'

let tasks = []

function loadTasks() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch (e) { console.error('loadTasks', e); return [] } }
function saveTasks() { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)) }

tasks = loadTasks()

const taskInput = document.getElementById('taskInput')
const addTaskBtn = document.getElementById('addTaskBtn')
const taskListEl = document.getElementById('tasklist')
const clearCompletedBtn = document.getElementById('clearCompleted')
const filterButtons = document.querySelectorAll('.filter-btn')

let currentFilter = 'all'

function render() {
  taskListEl.innerHTML = ''
  const visible = tasks.map((t, i) => ({ ...t, _idx: i })).filter(t => {
    if (currentFilter === 'active') return !t.completed
    if (currentFilter === 'completed') return t.completed
    return true
  })
  if (!visible.length) { taskListEl.innerHTML = '<div class="empty">No tasks</div>'; return }
  visible.forEach(t => {
    const idx = t._idx
    const item = document.createElement('div')
    item.className = 'task-item'
    const left = document.createElement('div'); left.className = 'task-left'
    const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.checked = !!t.completed; checkbox.addEventListener('change', () => toggleComplete(idx))
    const label = document.createElement('span'); label.textContent = t.text; if (t.completed) label.className = 'completed'
    left.appendChild(checkbox); left.appendChild(label)
    const actions = document.createElement('div'); actions.className = 'task-actions'
    const editBtn = document.createElement('button'); editBtn.className = 'edit'; editBtn.textContent = 'Edit'; editBtn.addEventListener('click', () => startEdit(idx, label))
    const deleteBtn = document.createElement('button'); deleteBtn.className = 'delete'; deleteBtn.textContent = 'Delete'; deleteBtn.addEventListener('click', () => deleteTask(idx))
    actions.appendChild(editBtn); actions.appendChild(deleteBtn)
    item.appendChild(left); item.appendChild(actions); taskListEl.appendChild(item)
  })
}

function addTask(text) { if (!text || !text.trim()) return; tasks.push({ text: text.trim(), completed: false, id: Date.now() }); saveTasks(); render() }
function deleteTask(index) { tasks.splice(index, 1); saveTasks(); render() }
function toggleComplete(index) { tasks[index].completed = !tasks[index].completed; saveTasks(); render() }

function startEdit(index, labelEl) {
  labelEl.contentEditable = true; labelEl.focus(); const previous = tasks[index].text
  function finish() { labelEl.contentEditable = false; const newText = labelEl.textContent.trim(); if (!newText) tasks.splice(index, 1); else tasks[index].text = newText; saveTasks(); render(); labelEl.removeEventListener('blur', finish); labelEl.removeEventListener('keydown', onKey) }
  function onKey(e) { if (e.key === 'Enter') { e.preventDefault(); labelEl.blur() } if (e.key === 'Escape') { labelEl.textContent = previous; labelEl.blur() } }
  labelEl.addEventListener('blur', finish); labelEl.addEventListener('keydown', onKey)
}

function clearCompleted() { tasks = tasks.filter(t => !t.completed); saveTasks(); render() }
function setFilter(filter) { currentFilter = filter; filterButtons.forEach(b => b.classList.toggle('active', b.dataset.filter === filter)); render() }

addTaskBtn && addTaskBtn.addEventListener('click', () => { addTask(taskInput.value); taskInput.value = ''; taskInput.focus() })
taskInput && taskInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { addTask(taskInput.value); taskInput.value = '' } })
clearCompletedBtn && clearCompletedBtn.addEventListener('click', clearCompleted)
filterButtons && filterButtons.forEach(b => b.addEventListener('click', () => setFilter(b.dataset.filter)))

render()
