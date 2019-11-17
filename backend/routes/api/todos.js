const express = require('express');
const router = express.Router();
const TodoList = require('../../models/TodoList');
const validateTodo = require('../../validation/todo.js');

//@GET /todo
//@desc view list todo
//@access Public

router.get('/',async (req, res) => {
    
    try {
        const todolist = await TodoList.find();
        return res.json(todolist);
    } catch (err) {
        return res.status(404).json({ msg : 'Todo Not Found'});
    }

});


//@POST /todo
//@desc add a  todo
//@access Private


router.post('/todo', async (req, res) => {
    const { errors , isValid } = validateTodo(req.body);
    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    try {
        //create new todo
        const newTodo = new TodoList({
            title : req.body.title
        });
        //add todo
        const addTodo = await newTodo.save();
        return res.json(addTodo);

    } catch (err) {
        return res.status(400).json({ msg : 'Add todo failed'});
    }
});

//@PUT /todo
//@desc update a  todo
//@access Private


router.put('/todo/:todoId', async (req, res) => {
    const { errors , isValid } = validateTodo(req.body);
    const id = req.params.todoId;
    if (!isValid) {
        return res.status(400).json(errors);
    }

    try {

        const updateTodo = await TodoList.findByIdAndUpdate(
            id,
            { $set : { title : req.body.title }},
            { new : true}
        );
        if(updateTodo) {
            return res.json({ msg : 'todo updated success'});
        }

    } catch (err) {
        return res.status(400).json({ msg : 'Update todo failed'});
    }
});

//@DELETE /todo
//@desc update a  todo
//@access Private


router.delete('/todo/:todoId', async (req, res) => {
    const { errors , isValid } = validateTodo(req.body);
    const id = req.params.todoId;
    if (!isValid) {
        return res.status(400).json(errors);
    }

    try {

        const removeTodo = await TodoList.findOneAndRemove(id);
        if (removeTodo) {
            return res.json({ msg : 'Todo deleted success'});
        }
        

    } catch (err) {
        return res.status(400).json({ msg : 'Delete todo failed'});
    }
});



module.exports = router;