const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");

const Schema = mongoose.Schema;

const TodoListSchema = new Schema({
    taskName : String,
    submittedCount : Number,
    taskCompleted : Boolean,
    submissionDate: String,
    submissionTime:String
});

const StudentListSchema = new Schema({
    studentName : String,
    rollNo  : Number,
    task_id : ObjectId,
    // task_id : String,
    taskCompleted:[TodoListSchema]
});
// const TodoTaskModel = mongoose.model("TodoList",TodoListSchema);
const TodoTaskModel = mongoose.model("todolists",TodoListSchema);
const StudentTaskModel = mongoose.model("studenttasks",StudentListSchema);

module.exports = {
    TodoTaskModel,
    StudentTaskModel
};