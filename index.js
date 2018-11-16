/**
 * gcloud functions deploy <FUNC_NAME> --runtime nodejs6 --trigger-resource cloud-builds --trigger-event google.pubsub.topic.publish
 * @param {object} event The Cloud Functions event.
 * @param {function} callback The callback function.
 */
const { Storage } = require('@google-cloud/storage');

exports.cloudBuildBadge = (event, callback) => {
  const pubsubMessage = event.data;
  if  (pubsubMessage.data) {
    buildResource = JSON.parse(Buffer.from(pubsubMessage.data, 'base64').toString())
    repo = buildResource.source.repoSource.repoName === "${repo}";
    branch = buildResource.source.repoSource.branchName === "${branch}";
    status = buildResource.status;

    const storage = new Storage();
    if (repo && branch && status == "SUCCESS") {
      storage.bucket("${bucket}")
      .file("build/success.svg")
      .copy(storage.bucket("tensortask-static")
      .file("build/${badge}.svg"));
    }
    if (repo && branch && status == "FAILURE") {
      storage.bucket("${bucket}")
      .file("build/failure.svg")
      .copy(storage.bucket("tensortask-static")
      .file("build/${badge}.svg"));
    }
  }
  callback();
};



