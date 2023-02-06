const express = require('express')


const router = express.Router()
const { addNewWorkout, fetchAllWorkouts, fetchSingleWorkoutById, deleteAWorkoutById, updateAWorkoutById } = require('../controllers/workoutController')

const authRequest = require('../middleware/authRequest')

router.use(authRequest)

router.get('/', fetchAllWorkouts);

router.get('/:id', fetchSingleWorkoutById);

router.post('/', addNewWorkout)

router.delete('/:id', deleteAWorkoutById)

router.patch('/:id', updateAWorkoutById)

module.exports = router;