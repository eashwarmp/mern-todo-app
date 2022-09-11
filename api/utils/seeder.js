const connectDB = require('../config/db');
const todos = require('../data/todo');
const Todo = require('../models/todoModel');

connectDB()

const importData = async () => {
    try {
        await Todo.deleteMany()

        await Todo.insertMany(todos);

        console.log(`The Task for the profileId:  ${todos.map((todo) => todo.profileId)} has been inserted into the DB `)

        process.exit()

    } catch (err) {
        process.exit(1)
    }
}

importData()