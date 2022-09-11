const express = require('express')

const Todo = require('../models/todoModel');

const router = new express.Router()

//To fetch all the list of todos
router.get('/todos', async (req,res) => {
    try {
        const todos = await Todo.find();
        res.json(todos)
    } catch (e) {
        console.log(`Exception caught --------> ${e}`)
    }
})

module.exports = router
