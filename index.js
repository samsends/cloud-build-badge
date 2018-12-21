/**
 * gcloud functions deploy <FUNC_NAME> --runtime nodejs6 --trigger-resource cloud-builds --trigger-event google.pubsub.topic.publish
 * @param {object} event The Cloud Functions event.
 * @param {function} callback The callback function.
 */
const { Storage } = require('@google-cloud/storage');

exports.${badge} = (event, callback) => {
  const pubsubMessage = event.data;
  if (pubsubMessage.data) {
    buildResource = JSON.parse(Buffer.from(pubsubMessage.data, 'base64').toString())
    if (buildResource.source) {
      if (buildResource.source.repoSource.repoName && buildResource.source.repoSource.branchName) {
        repo = buildResource.source.repoSource.repoName === "${repo}";
        branch = buildResource.source.repoSource.branchName === "${branch}";
      }
    } else {
      callback();
    }
    if (buildResource.status) {
      status = buildResource.status;
    } else {
      callback();
    }

    const storage = new Storage();
    if (repo && branch && status == "SUCCESS") {
      storage.bucket("${bucket}")
        .file("build/success.svg")
        .copy(storage.bucket("${bucket}")
          .file("build/${badge}.svg"));
      console.log("switched badge to build success")
    }
    if (repo && branch && status == "FAILURE") {
      storage.bucket("${bucket}")
        .file("build/failure.svg")
        .copy(storage.bucket("${bucket}")
          .file("build/${badge}.svg"));
      console.log("switched badge to build failure")
    }
  }
  callback();
};



