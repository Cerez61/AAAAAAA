const fs = require("fs");
const path = require("path");

const assetsFile = "./public/assets";
const resultFile = "./public/src/assets";

function scanAssets(dir) {
  const files = fs.readdirSync(dir);
  const fileBaseName = path.basename(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      scanAssets(filePath);
    } else if (path.extname(file) === ".png") {
      addPNG(fileBaseName, file);
    }
  });

  if (path.basename(fileBaseName) !== "assets" && !fs.existsSync(path.join(resultFile, fileBaseName))) createFile(fileBaseName);
}

function createFile(fileName) {
  fs.mkdir(path.join(resultFile, fileName), (err) => {
    if (err) throw err;
  });
}
function addPNG(fileName, assetName) {
  fs.rename(path.join(assetsFile, fileName, assetName), path.join(resultFile, fileName, assetName), (err) => {
    if (err) throw err;
  });
}
scanAssets(assetsFile);
