const AWS = require('aws-sdk');
const { v4 } = require('uuid');

// Initialize S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadImageToS3 = async (req, res, next) => {
  try {
    // Extract file details from the request
    const file = req.file;
    
    // Create a unique filename for the image using UUID
    const fileName = v4() + '_' + file.originalname;

    // Set up parameters for S3 upload
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer, // Use buffer instead of path for multer memory storage
      ContentType: file.mimetype
    };

    // Upload image to S3
    const uploadResult = await s3.upload(params).promise();

    // Return the S3 URL of the uploaded image
    res.json({ imageUrl: uploadResult.Location });
  } catch (err) {
    console.error('Error uploading image to S3:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

module.exports = {
  uploadImageToS3
};
