const db = require('../db');

function getAllTodos(status) {
    if (status === 'completed') return db('todos').where('is_completed', true);
    if (status === 'incomplete') return db('todos').where('is_completed', false);
    return db('todos');
}

function getTodoById(id) {
    return db('todos').where({ id }).first();
}

function createTodo(todo) {
    return db('todos').insert(todo);
}

function updateTodo(id, updates) {
    return db('todos').where({ id }).update(updates);
}

function deleteTodo(id) {
    return db('todos').where({ id }).del();
}

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};
