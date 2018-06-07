#!/bin/bash
# Usage: ./upload-file.sh ./test.json

FILEPATH=$1
FILENAME=$(basename $1)
SSH_KEY=~/go-ipfs-node.pem
REMOTE_DIR=/home/ec2-user/upload
REMOTE_USERNAME=ec2-user
REMOTE_HOST=54.93.56.226

scp -i $SSH_KEY -q -r $FILEPATH $REMOTE_USERNAME@$REMOTE_HOST:$REMOTE_DIR

REMOTE_COMMAND=$(echo ipfs add -r $REMOTE_DIR/$FILENAME\; rm -rf $REMOTE_DIR/$FILENAME)

OUTPUT=$(ssh -i $SSH_KEY $REMOTE_USERNAME@$REMOTE_HOST $REMOTE_COMMAND)
OUTPUT_ARRAY=($OUTPUT)

echo "$OUTPUT"
ADDRESS=${OUTPUT_ARRAY[${#OUTPUT_ARRAY[@]}-2]}
echo ""
echo "File is available here:"
echo http://$REMOTE_HOST:8080/ipfs/$ADDRESS
