const express = require('express');

const Todo = require('../models/todoModel');

const router = new express.Router()

router.use('/todos/:todoId', async (req,res,next) => {
    try {
        let { todoId } = req.params;
        const todo = await Todo.findById(todoId);
        if (todo) {
            req.todo = todo;
            return next();
        }
        return res.status(404).send();
    } catch(e) {
        console.log(`Exception caught --------> ${e}`)
        res.status(500).send();
    }
})

//To fetch all the list of todos
router.get('/todos', async (req,res) => {
    try {
        const todos = await Todo.find();
        res.json(todos)
    } catch (e) {
        console.log(`Exception caught --------> ${e}`)
    }
})

//To add a new todo to your list
router.post('/todos', async (req,res) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).json(todo);
    } catch(e) {
        console.log(`Exception caught --------> ${e}`)
        if (e.name === 'ValidationError') {
            return res.status(400).send(e);
        }
        res.status(500).send(e);
    }
})

//To delete a todo from your list
router.delete('/todos/:todoId', async (req,res) => {
    try {
        let { todo } = req;
        await todo.remove();
        res.status(204).json(`Successfully deleted the todo`);
    } catch(e) {
        console.log(`Exception caught --------> ${e}`)
        res.status(500).send(e);
    }
})

//To update a todo with it's associated Id
router.put('/todos/:todoId', async (req,res) => {
    let updates = Object.keys(req.body);
    const allowedUpdates = ['todo', 'completed', 'priority']
    let isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if(!isValidOperation) {
        return res.status(400).send({error : "Invalid updates!"})
    }
    try {
        let { todo } = req;
        updates.forEach((update) => {
            todo[update] = req.body[update]
        })
        await todo.save()
        res.send(todo)
    } catch(e) {
        console.log(`Exception caught --------> ${e}`)
    }
})

module.exports = router
