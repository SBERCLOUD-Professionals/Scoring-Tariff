#!/bin/bash

docker.exe build -f ./Events.Dockerfile -t events:$1 .
docker.exe tag events:$1 swr.ru-moscow-1.hc.sbercloud.ru/prof/events:$1
docker.exe push swr.ru-moscow-1.hc.sbercloud.ru/prof/events:$1