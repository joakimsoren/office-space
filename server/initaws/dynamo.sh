#!/bin/bash

awslocal dynamodb create-table \
    --table-name queue \
    --attribute-definitions \
        AttributeName=weekday,AttributeType=S \
    --key-schema \
        AttributeName=weekday,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
