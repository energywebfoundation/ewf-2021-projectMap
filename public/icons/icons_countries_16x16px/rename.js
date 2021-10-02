const fs = require("fs");
const path = require("path");

renameCountries();

function renameCountries() {
  getPngs().forEach(rename);
}

function getPngs() {
  return readFiles(__dirname).filter(isPng);
}

function readFiles(folderPath) {
  return fs.readdirSync(path.join(folderPath)).map(appendToPath(folderPath));
}

function appendToPath(folderPath) {
  return (filePath) => path.join(folderPath, filePath);
}

function isPng(filePath) {
  return path.extname(filePath).toLowerCase() === ".png";
}

function rename(file) {
  fs.renameSync(
    file,
    appendToPath(path.dirname(file))(sanitize(path.basename(file)))
  );
}

function sanitize(fileName) {
  return fileName.toLowerCase().replace(" ", "_");
}
