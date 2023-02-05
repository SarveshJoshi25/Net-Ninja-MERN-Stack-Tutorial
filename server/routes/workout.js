const express = require('express')

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


router.post('/', (req, res) => {
    res.status(200).json({
        message: `You've just requested to get Workout (POST)`
    })
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