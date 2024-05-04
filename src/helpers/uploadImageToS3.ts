/**
 * @file src/helpers/uploadImageToS3.js
 * @description Uploading File in s3 bucket
*/
import { ObjectCannedACL, S3Client } from "@aws-sdk/client-s3"
import { Upload } from "@aws-sdk/lib-storage";


const uploadImageToS3 = async (file: Express.Multer.File):Promise<string> => {
    // initialize s3Client
    const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY as string,
            secretAccessKey: process.env.AWS_SECRET_KEY as string,
        },
    });

    //prepare params for upload
    const params = {
        Bucket: process.env.AWS_BUCKET as string,
        Key: `${process.env.AWS_BUCKET_FOLDER}/${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ACL: ObjectCannedACL.public_read,
    };

    const upload = new Upload({
        client:s3Client,
        params,
    })  

    // uploading the file
    const uploadedFile = await upload.done()

    return uploadedFile?.Location || "";
};

export default uploadImageToS3;