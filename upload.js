const fs = require('fs')
const AWS = require('aws-sdk')
require("dotenv").config();
const bucket = 'dimitube-video';
let folder = './videos/video'

AWS.config.update({
    accessKeyId: process.env.AK,
    secretAccessKey: process.env.SK,
    region: 'ap-northeast-2'
})

const s3 = new AWS.S3({
    apiVersion: '2006-03-01'
});

fs.readdir(folder, (error, list) => {
    for (let i = 0; i < list.length; i++) {
        // console.log(list[i])

        const fileContent = fs.readFileSync(`./videos/video/${list[i]}`);

        const params = {
            Bucket: bucket,
            Key: `video/${list[i]}`,
            Body: fileContent
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.log(err)
            }

            console.log(`File uploaded successfully. ${data.Location}`)
        });
    }
})