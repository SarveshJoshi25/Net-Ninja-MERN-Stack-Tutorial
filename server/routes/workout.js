const express = require('express')

const Workout = require('../models/workoutModel')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({
        message: "You've just requested to Workout URL (GET)"
    })
})

router.get('/:id', (req, res) => {
    res.status(200).json({
        message: `You've just requested to get ${req.params.id} workouts (GET)`
    })
})


router.post('/', async (req, res) => {
    const {title, load, reps} = req.body

    try{ 
        const workout = await Workout.create({title, load, reps})
        res.status(201).json({message : `Workout: ${workout.title} created successfully!`})
    }catch (error) {
        res.status(400).json({
            error: error
        })
    }
    
})

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