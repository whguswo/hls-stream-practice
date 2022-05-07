const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg')
let fileName = process.argv[2]
let fileDir = fileName.replace('.mp4', '')
const fs = require('fs')

ffmpeg.setFfmpegPath(ffmpegInstaller.path)

const makeFolder = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
}

makeFolder(`./videos/${fileDir}`)

ffmpeg(`videos/${fileName}`, { timeout: 432000 }).addOptions([
    '-profile:v baseline',
    '-level 3.0',
    '-start_number 0',
    '-hls_time 10',
    '-hls_list_size 0',
    '-f hls'
]).output(`videos/${fileDir}/output.m3u8`).on('end', () => {
    console.log('end');
}).run()