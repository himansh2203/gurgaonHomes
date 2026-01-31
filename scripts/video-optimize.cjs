const ffmpegPath = require("ffmpeg-static");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");

ffmpeg.setFfmpegPath(ffmpegPath.path || ffmpegPath);

const INPUT = path.join(__dirname, "../public/gurgaon-hero.mp4");
const OUT = path.join(__dirname, "../public");

if (!fs.existsSync(INPUT)) {
  console.error("Input video not found:", INPUT);
  process.exit(1);
}

console.log("Optimizing hero video:", INPUT);

function run() {
  // 1080
  ffmpeg(INPUT)
    .videoCodec("libx264")
    .size("1920x1080")
    .outputOptions(["-preset slow", "-crf 22", "-pix_fmt yuv420p"])
    .on("end", () => console.log("Created hero-1080.mp4"))
    .on("error", (err) => console.error("1080px job error:", err.message))
    .save(path.join(OUT, "hero-1080.mp4"));

  // 720 mp4
  ffmpeg(INPUT)
    .videoCodec("libx264")
    .size("1280x720")
    .outputOptions(["-preset fast", "-crf 23", "-pix_fmt yuv420p"])
    .on("end", () => console.log("Created hero-720.mp4"))
    .on("error", (err) => console.error("720mp4 job error:", err.message))
    .save(path.join(OUT, "hero-720.mp4"));

  // 480 mp4
  ffmpeg(INPUT)
    .videoCodec("libx264")
    .size("854x480")
    .outputOptions(["-preset fast", "-crf 24", "-pix_fmt yuv420p"])
    .on("end", () => console.log("Created hero-480.mp4"))
    .on("error", (err) => console.error("480 job error:", err.message))
    .save(path.join(OUT, "hero-480.mp4"));

  // webm
  ffmpeg(INPUT)
    .videoCodec("libvpx-vp9")
    .size("1280x720")
    .outputOptions(["-crf 33", "-b:v 0"])
    .on("end", () => console.log("Created hero-720.webm"))
    .on("error", (err) => console.error("webm job error:", err.message))
    .save(path.join(OUT, "hero-720.webm"));

  // poster (frame at 2 seconds)
  ffmpeg(INPUT)
    .screenshots({
      count: 1,
      timemarks: ["2"],
      filename: "hero-poster.jpg",
      folder: OUT,
    })
    .on("end", () => console.log("Created hero-poster.jpg"))
    .on("error", (err) => console.error("poster job error:", err.message));
}

run();
