const express = require('express')


const router = express.Router()
const { addNewWorkout, fetchAllWorkouts, fetchSingleWorkoutById } = require('../controllers/workoutController')

router.get('/', fetchAllWorkouts);

router.get('/:id', fetchSingleWorkoutById);

router.post('/', addNewWorkout)

router.delete('/:id', (req, res) => {
    res.status(200).json({
        message: `You've just requested to delete Workout ${req.params.id} (DELETE)`
    })
})

router.patch('/:id', (req, res) => {
    res.status(200).json({
        message: `You've just requested to update Workout ${req.params.id} (PATCH)`
    })
})

module.exports = router;