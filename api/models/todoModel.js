const mongoose = require('mongoose');

const todoSchema = mongoose.Schema (
    {   
        todo: {
            type: String,
            required: true
        }, 
        completed : {
            type: Boolean,
            required: true
        },
        priority : {
            type : String,
            required: true
        }, 
        profileId : {
            type: String,
            required: true
        }
    }, {
        timestamps: true,
    }
)

const todo = mongoose.model("Todos", todoSchema);

module.exports = todo;