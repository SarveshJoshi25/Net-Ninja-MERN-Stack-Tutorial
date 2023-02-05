const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// POST -> Add a new workout 

const addNewWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    try{ 
        const workout = await Workout.create({title, load, reps})
        res.status(201).json({message : `Workout: ${workout.title} created successfully!`})
    }catch (error) {
        res.status(400).json({
            error: error
        })
    }
}

// GET -> Fetch all workouts

const fetchAllWorkouts = async (req, res) => {
    try{
        const workouts = await Workout.find({}).sort({createdAt: -1})
        res.status(200).json({
            message: workouts
        })
    }catch (error) {
        res.status(400).json({
            error: error
        })
    }
}

// GET -> Fetch a single workout

const fetchSingleWorkoutById = async (req, res) => {
    try{
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(406).json({
                error: "Invalid type of ID"
            })
        }
        const found = await Workout.findById(id)
        if (!found){
            return res.status(404).json({
                message: "Workout not found"
            })
        }else{
            return res.status(200).json({
                workout : found
            })
        }
    }catch (error) {
        // console.log(error)
        res.status(406).json({
            error: error
        })
    }
}


module.exports = {
    addNewWorkout, 
    fetchAllWorkouts,
    fetchSingleWorkoutById
}