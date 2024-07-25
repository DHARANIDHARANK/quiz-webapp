#!/bin/bash

cd loginpage
docker build -t loginpage .

cd ..

cd backend 
docker build -t quizback .


cd ..