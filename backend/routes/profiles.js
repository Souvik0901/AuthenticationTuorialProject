const express = require('express')
const router = express.Router()
const multer = require('multer')

const {
   getProfiles,
   getProfile,
   createProfile,
   deleteProfile,
   updateProfile,
   uploadImage,

} = require('../controllers/profileController')

const requireAuth = require('../middleware/requireAuth')


// requireauth for all profile routes
router.use(requireAuth)



// file upload or image upload using multer fuction
const fileStorageEngine = multer.diskStorage({
   destination: function(req, file, cb) {
     return cb(null, "./largefiles")
   },
   filename: function (req, file, cb) {
     return cb(null, Date.now()+ '__' + file.originalname);
   }
 })
 
 const upload = multer({storage: fileStorageEngine})

router.use('/images', express.static('largefiles'));

//GET all profiles
router.get('/', getProfiles)

// GET a single profile
router.get('/:id', getProfile)

// POST a new profile
router.post('/', createProfile)

// DELETE a profile
router.delete('/:id', deleteProfile)

// UPDATE a profile
router.patch('/:id', updateProfile)

//Upload a Image
router.post('/singleimage', upload.single('ProfileImg'), uploadImage)

module.exports= router