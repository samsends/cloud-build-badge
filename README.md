# cloud-build-badge

Add cloud build badges in 2 minutes.

1) Create a cloud storage bucket ([tutorial here](https://cloud.google.com/storage/docs/creating-buckets)).
2) Create a folder in the bucket named `build`.
3) Download [failure](https://storage.googleapis.com/tensortask-static/build/failure.svg) and [success](https://storage.googleapis.com/tensortask-static/build/success.svg) badges (follow links and save).
4) Upload both badges to the google storage bucket/folder created in the previous step (e.g. `YOUR_BUCKET/build/success.svg`).
5) Create a placeholder for your badge (e.g. `YOUR_BUCKET/build/BADGE_ID.svg`.
6) Set ENV Variables.

```bash
export REPO="YOUR_REPO" // e.g. github-sbsends-cloud-build-badge
export BRANCH="YOUR_BRANCH" // e.g. master
export BUCKET="YOUR_BUCKET" // e.g. my-gcp-bucket
export BADGE="PATH_TO_PUBLIC_BADGE" // e.g. cbb-master-badge
```

7) Clone this repository into any directory.

`git clone https://github.com/sbsends/cloud-build-badge.git`

`cd cloud-build-badge`

8) Use regular expressions to alter the index.js file (the cloud function).

`sed -i.tmp -e "s/\${repo}/$REPO/" -e "s/\${branch}/$BRANCH/" -e "s/\${bucket}/$BUCKET/" -e "s/\${badge}/$BADGE/" index.js && rm index.js.tmp`

9) Deploy the cloud function as the badge name and set the function trigger to the cloud-builds pubsub topic.

`gcloud functions deploy $BADGE --runtime nodejs6 --trigger-resource cloud-builds --trigger-event google.pubsub.topic.publish`

10) Add badge to README.md
```
# README.md
[![cloud build status](https://storage.googleapis.com/<BUCKET>/build/<BADGE>.svg)](https://github.com/sbsends/cloud-build-badge)
```
