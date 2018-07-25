const functions = require("firebase-functions");
const gcs = require("@google-cloud/storage")();
const os = require("os");
const path = require("path");
const spawn = require("child-process-promise").spawn;

exports.onFileAdd = functions.storage.object().onFinalize(event => {
  const object = event;
  const bucket = object.bucket;
  const contentType = object.contentType;
  const filePath = object.name;
  console.log("File chaaange detected, function execution started");

  if (object.resourceState === "not_exists") {
    console.log("We deleted a file, exit...");
    return;
  }
  if (path.basename(filePath).startsWith("resized-")) {
    console.log("We already renamed that file");
    return;
  }

  const destBucket = gcs.bucket(bucket);
  const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
  const metadata = { contentType: contentType };
  return destBucket
    .file(filePath)
    .download({
      destination: tmpFilePath
    })
    .then(() => {
      return spawn("convert", [tmpFilePath, "-resize", "500x500", tmpFilePath]);
    })
    .then(() => {
      return destBucket.upload(tmpFilePath, {
        destination: "resized-" + path.basename(filePath),
        metadata: metadata
      });
    });
});
