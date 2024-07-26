#!/bin/bash

cd loginpage
docker build -t this23/quizapp:loginpage .
docker push this23/quizapp:loginpage

cd ..

cd backend 
docker build -t this23/quizapp:quizback .
docker push this23/quizapp:quizback

cd ..
