

echo "Building app ..."

echo "Deploying files to server...."

scp -r build/* root@192.34.57.39:/var/www/192.34.57.39/

echo "Done"
