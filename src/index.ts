import { convertPNG } from "./convertPng";
import { S3, Lambda } from "aws-sdk";

const s3 = new S3({
  apiVersion: "2006-03-01",
  region: "us-east-2"
});

exports.handler = (event: any, context: any, callback: Function) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  const params = {
    Bucket: bucket,
    Key: key
  };
  s3.getObject(params, (err, data) => {
    if (err) {
      console.log(err);
      const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
      console.log(message);
      callback(message);
    } else {
      console.log("CONTENT TYPE:", data.ContentType);
      const fileNameRoot = key.split(".")[0];
      convertPNG(
        data.Body,
        `${fileNameRoot}.png`,
        (err: Error, buffer: Buffer) => {
          if (err) {
            console.log(err);
            const message = `Error converting to PNG`;
            console.log(message);
            callback(message);
          } else {
            s3.putObject(
              {
                Bucket: "np-dicom-pngs",
                Key: `${fileNameRoot}.png`,
                Body: buffer
              },
              (err, data) => {
                if (err) {
                  console.log(err);
                  const message = `Error uploading PNG to bucket`;
                  console.log(message);
                  callback(message);
                }
              }
            );
          }
        }
      );
    }
  });
};
