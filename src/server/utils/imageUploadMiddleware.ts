import * as aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

const S3_BUCKET_NAME = 'jr-demo';
const ONE_MEGEBYTE = 1048576;

const s3 = new aws.S3({ region: 'us-east-2' });

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb({ name: 'MulterError', message: 'Only support jpeg image' });
    }
};

export const makeImageUploadMiddleware = (
    domainName:string,
    fieldName: string,
    urlParamName?: string,
) => {
    const storage = multerS3({
        s3,
        bucket: S3_BUCKET_NAME,
        key: (req, file, cb) => {
            const fileName = (urlParamName && req.params[urlParamName]) || Date.now().toString();
            const fullPath = `${domainName}/${fileName}.jpeg`;
            cb(null, fullPath);
        }
    });

    const parser = multer({
        fileFilter,
        storage,
        limits: {
            fileSize: ONE_MEGEBYTE,
        },
    });

    const middleware = parser.single(fieldName);

    return middleware;
}
