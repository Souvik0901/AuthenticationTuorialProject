const AWS = require('aws-sdk');
const { v4 } = require('uuid');
const ProfileImage = require('../models/profileImageModel');

// Initialize S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadImageToS3 = async (req, res, next) => {
  try {
    const file = req.file;
    
    const fileName = v4() + '_' + file.originalname;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer, 
      ContentType: file.mimetype
    };

    const uploadResult = await s3.upload(params).promise();

    // Create a new profile image document in MongoDB
    const newProfileImage = new ProfileImage({
      userimage: uploadResult.Location
    });

    // Save the profile image document to the database
    const savedProfileImage = await newProfileImage.save();


    res.json({ 
      imageUrl: uploadResult.Location,
      imageId: savedProfileImage._id
    });
  } catch (err) {
    console.error('Error uploading image to S3 and saving to DB:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};



module.exports = {
  uploadImageToS3,
};
