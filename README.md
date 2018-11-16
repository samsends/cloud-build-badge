# cloud-build-badge

Add cloud build badges in 2 minutes.

```bash
export REPO="YOUR_REPO" // e.g. github-sbsends-cloud-build-badge
export BRANCH="YOUR_BRANCH" // e.g. master
export BUCKET="YOUR_BUCKET" // e.g. my-gcp-bucket
export BADGE="PATH_TO_PUBLIC_BADGE" // e.g. cbb-master-badge
export FUNC="ID_FOR_CLOUD_FUNC" //cbbMasterBadgeFunc

git clone https://github.com/sbsends/cloud-build-badge.git && cd cloud-build-badge \
sed -i.tmp -e "s/\${repo}/$REPO/" -e "s/\${branch}/$BRANCH/" -e "s/\${bucket}/$BUCKET/" -e "s/\${branch}/$BADGE/" index.js \
&& rm index.js.tmp \
gcloud functions deploy $FUNC --runtime nodejs6 --trigger-resource cloud-builds --trigger-event google.pubsub.topic.publish
```
