// const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");
const { Collection } = require("mongoose");
const TodoListModel = require("../model/studentListModel");
const StudentListModel = require("../model/studentListModel");

const indexController = {
    getTaskData: async function (req, res) {
        try {
            const result = await TodoListModel.TodoTaskModel.find().exec();
            res.send({ status: true, result });
        } catch (error) {
            res.send({ status: false, error });
        }
    },
    saveNewTask: async function (req, res) {
        var data = req.body;
        try {
            const task = new TodoListModel.TodoTaskModel({
                taskName: data.taskName,
                taskCompleted: data.taskCompleted,
                submittedCount: data.submittedCount,
                submissionDate: data.submissionDate,
                submissionTime: data.submissionTime
            });
            const result = await task.save();
            res.send({ status: true, task })
        }
        catch (error) {
            res.send({ status: false, error:error+" is" });
        }
    },
    updateTask: async function (req, res) {
        var data = req.query;
        try {
            const result = await TodoListModel.TodoTaskModel.updateOne({ _id: data._id },
                {
                    $set: {
                        taskName: data.taskName,
                        taskCompleted: data.taskCompleted
                    }
                });
            res.send({ status: true, result });
        } catch (error) {
            res.send({ status: false, error: error+" is "});
        }
    },
    updateManyTasks: async function (req, res) {
        var data = req.body;
        try {
            var result = await TodoListModel.TodoTaskModel.updateMany({ submittedCount: { $eq: 4 } },
                {
                    taskName: data.taskName,
                    taskCompleted: data.taskCompleted,
                    submissionDate: data.submissionDate,
                    submissionTime: data.submissionTime,
                    submittedCount:data.submittedCount
                }, { upsert: true });
            res.send({ status: true, result });
        } catch (error) {
            res.send({ status: false, error: error + " is" });
        }
    },
    deleteTask: async function (req, res) {
        var data = req.query;
        try {
            var result = await TodoListModel.TodoTaskModel.deleteOne({ _id: data._id });
            res.send({ status: true, result });
        } catch (error) {
            res.send({ status: false, error });
        }
    },

    deleteStudent: async function(req,res) {
        var data = req.query;
        try {
            var result = await StudentListModel.StudentTaskModel.deleteOne({_id:data.id});
            res.send({status:true,...result});
        } catch (error) {
            res.send({status:false,...error});
        }
    },

    deleteManyStudents: async function(req,res) {
        var data = req.query;
        try {
            var result = await StudentListModel.StudentTaskModel.deleteMany({ task_id:ObjectId(data._id) });
            // var result = await StudentListModel.StudentTaskModel.deleteMany({ task_id:data._id });
            res.send({ status: true, ...result });
            }
            catch(error){
                res.send({status:false, ...error});
            }
    },

    deleteManyTasks: async function (req, res) {
        var data = req.query;
        try {
            var result = await TodoListModel.TodoTaskModel.deleteMany({ submittedCount: { $eq: data.submittedCount } });
            res.send({ status: true, result });
        } catch (error) {
            res.send({ status: false, error });
        }
    },
    saveNewStudent: async function (req, res) {
        var data = req.body;
        try {
            const task = new StudentListModel.StudentTaskModel({
                studentName: data.studentName,
                rollNo: data.rollNo,
                task_id: ObjectId(data.task_id),
                taskCompleted: data.taskObj
            });
            const result = await task.save();
            res.send({ status: true, task })
        }
        catch (error) {
            res.send({ status: false, error: error+" is " });
        }
    },
    getStudentListFromTaskID : async function(req,res){
        var data = req.body;
        console.log(data);
        try {
            var result = await TodoListModel.TodoTaskModel.aggregate([{$match:{ _id:ObjectId(data._id)}}, 
                {
                    $lookup:{
                        from:"studenttasks", ///Working with this 
                        //but not with this comment line 
                        // from: TodoListModel.StudentTaskModel.collection.studenttasks,  //"studenttasks"
                        localField : "_id",
                        foreignField : "task_id",
                        as : "studentsList"
                    }
                }]);
            res.send({ status: true, ...result });
        } catch (error) {
            res.send({status:false,error:error+" is"});
        }
    }
};
module.exports = indexController;

// db.todolists.aggregate([{$match:{_id:ObjectId('615fc7c67c57596208a1c95e')}},{$lookup:{from:"studenttask",localField:"_id",foreignField:"task_id",as:"studentList"}}])
// db.todolists.aggregate([{$match:{_id:ObjectId('615fc7c67c57596208a1c95e')}},{$lookup:{from:"studenttasks",localField:"_id",foreignField:"task_id",as:"studentList"}}])
//{"task_id":"615fc7c67c57596208a1c95e","taskName" :"Node JS API Task 1","submittedCount":5,"taskCompleted":true,"submissionDate":"12-08-2020","submissionTime":"02:30 PM"}