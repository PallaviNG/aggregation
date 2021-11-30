const router = require("express").Router();
const indexController = require("../controller/indexController");

router.get('/',indexController.getTaskData);
router.post('/save-new-task',indexController.saveNewTask);
router.put('/update-task',indexController.updateTask);
router.put('/update-many-tasks',indexController.updateManyTasks);
router.delete('/delete-task',indexController.deleteTask);
router.delete('/delete-many-tasks',indexController.deleteManyTasks);
router.post('/save-new-student',indexController.saveNewStudent);
router.delete('/delete-student',indexController.deleteStudent);
router.delete('/delete-many-students',indexController.deleteManyStudents);
router.post('/get-student-list-of-task',indexController.getStudentListFromTaskID);

module.exports = router;