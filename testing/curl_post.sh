#!/bin/bash

# add a card
echo "create card"
curl -s -X POST -d @entry.txt http://localhost:3001 --header "Content-Type:application/json" | awk -f mod.awk | tee upd_item.txt

# get cards containing the pattern (/search, /get)
echo "search cards with MA"
curl -s -X GET "http://localhost:3001?contains=MA" && echo

#put the specified card = update
echo "update card MA"
curl -s -X PUT -d @upd_item.txt http://localhost:3001 --header "Content-Type:application/json" && echo

# get the updated card
echo "search cards with MA"
curl -s -X GET "http://localhost:3001?contains=MA" && echo

# delete all cards containing the pattern
echo "deleting the card with MA"
curl -s -X DELETE "http://localhost:3001?contains=MA" && echo

#get should be empty
echo "search cards with MA: should be empty"
curl -s -X GET "http://localhost:3001?contains=MA" && echo
