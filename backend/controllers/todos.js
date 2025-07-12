const Todo = require('../models/todos');

exports.getTodos = async (req, res) => {
    try {
        const { status } = req.query;
        const todos = await Todo.getAllTodos(status);
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi lấy danh sách công việc' });
    }
};

exports.createTodo = async (req, res) => {
    try {
        const { title, description, due_date } = req.body;
        if (!title) return res.status(400).json({ error: 'Tiêu đề là bắt buộc' });

        await Todo.createTodo({ title, description, due_date });
        res.status(201).json({ message: 'Đã thêm công việc' });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi thêm công việc' });
    }
};

exports.updateTodo = async (req, res) => {
  try {
    const { title, description, due_date, is_completed } = req.body;
    const { id } = req.params;

    const todo = await Todo.getTodoById(id);
    if (!todo) return res.status(404).json({ error: 'Không tìm thấy công việc' });

    const updated = await Todo.updateTodo(id, { title, description, due_date, is_completed });

    res.json(updated);

  } catch (err) {
    console.error('Lỗi cập nhật task:', err);
    res.status(500).json({ error: 'Lỗi cập nhật công việc' });
  }
};


exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.getTodoById(id);
        if (!todo) return res.status(404).json({ error: 'Không tìm thấy công việc' });

        await Todo.deleteTodo(id);
        res.json({ message: 'Đã xoá công việc' });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi xoá công việc' });
    }
};
