#!/bin/bash

awslocal dynamodb create-table \
    --table-name queue \
    --attribute-definitions \
        AttributeName=weekday,AttributeType=S \
    --key-schema \
        AttributeName=weekday,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

awslocal dynamodb put-item \
    --table-name queue \
    --item '{"weekday":{"S":"monday"}}'

awslocal dynamodb put-item \
    --table-name queue \
    --item '{"weekday":{"S":"tuesday"}}'


awslocal dynamodb put-item \
    --table-name queue \
    --item '{"weekday":{"S":"wednesday"}}'

awslocal dynamodb put-item \
    --table-name queue \
    --item '{"weekday":{"S":"thursday"}}'

awslocal dynamodb put-item \
    --table-name queue \
    --item '{"weekday":{"S":"friday"}}'