#!/bin/bash
host="`hostname`"
# echo $host

# echo sed -i 's/hostname = "[a-z|0-9]*"/hostname = "'"$host"'"/' client.py 
sed -i 's/hostname = "[a-z|0-9]*"/hostname = "'"$host"'"/' client.py 