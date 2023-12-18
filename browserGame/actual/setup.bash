npm install
npm install express body-parser --save-dev
npm install node-env-run nodemon npm-run-all express-pino-logger pino-colada --save-dev
npm install ws
npm install react-axios axios prop-types

chmod 777 ftd/setup.bash
./ftd/setup.bash
cp ftd/package.json ./

echo "run 'npm run dev' to start server and client! :D"