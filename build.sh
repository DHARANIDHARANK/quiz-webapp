#!/bin/bash

cd loginpage
docker build -t this23/quizapp:loginpage .

cd ..

cd backend 
docker build -t this23/quizapp:quizback .


cd ..
