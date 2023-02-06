const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// POST -> Add a new workout 

const addNewWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    try{ 
        const user_id = req.user._id
        const workout = await Workout.create({title, load, reps, user_id})

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
        const user_id = req.user._id
        const workouts = await Workout.find({ user_id }).sort({createdAt: -1})
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
        const user_id = req.user._id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(406).json({
                error: "Invalid type of ID"
            })
        }
        const found = await Workout.find({_id:id, user_id})
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

// DELETE -> A specific element 

const deleteAWorkoutById = async (req, res) => {
    try{
       const { id } = req.params
       const user_id = req.user._id
       if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({
                error: "Invalid type of ID."
            })
       }
       const found = await Workout.findOneAndDelete({ _id : id, user_id}) 

       if(!found){
            return res.status(404).json({
                error: "Workout not found."
            })
       }

       return res.status(200).json({
            message: "Deleted the workout."
       })
    }catch (error){
        res.status(406).json({
            error: error
        })
    }
}


const updateAWorkoutById = async (req, res) => {
    try{
        const { id } = req.params
        const { user_id } = req.user._id

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({
                error: "Invalid Type of ID."
            })
        }

        const found = await Workout.findOneAndUpdate({ _id: id, user_id}, {
            ...req.body
        })

        if(!found){
            return res.status(404).json({
                error: "Workout not out."
            })
        }
        res.status(200).json({
            message: "Workout updated successfully!"
        })
    }catch (error){
        res.status(406).json({
            error: error
        })
    }
}

module.exports = {
    addNewWorkout, 
    fetchAllWorkouts,
    fetchSingleWorkoutById,
    deleteAWorkoutById,
    updateAWorkoutById
}