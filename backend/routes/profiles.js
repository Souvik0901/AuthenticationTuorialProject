const express = require('express')
const router = express.Router()


const {
   getProfiles,
   getProfile,
   createProfile,
   deleteProfile,
   updateProfile

} = require('../controllers/profileController')


//GET all workouts
router.get('/', getProfiles)

// GET a single workout
router.get('/:id', getProfile)

// POST a new workout
router.post('/', createProfile)

// DELETE a workout
router.delete('/:id', deleteProfile)

// UPDATE a workout
router.patch('/:id', updateProfile)

module.exports= router