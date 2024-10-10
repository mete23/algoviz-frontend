# AlgoViz

## Getting started
The setup is initialized with a Docker-Compose file.
It starts the needed containers and configures the networking.

Compose the setup by runing:

```console
docker compose up -d
```

Now your containers are running.
<hr>
If you want to attach to the running developement container you can run:
```console
docker attach front_dev
```
Now you are able to run commands from the otehr chapters.

<hr>
If you want to exit the container press <kbd>Ctrl</kbd> + <kbd>p</kbd> and then <kbd>Ctrl</kbd> + <kbd>q</kbd>.
<hr>

When you are outside the container you can shut everything down by running:

```console
docker compose down
```
### `npm install`
npm install is used to install all the node package dependencies locally in the folder.\
`npm install` uses the package.json to know which packages have to be installed.
Run this command every time the package.json has changed.
```console
npm install
```

### `npm start`
Type following command into your terminal to start the react app in the developing mode:

```console
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

If you want to cancel just press <kbd>control</kbd> + <kbd>c</kbd> on your keyboard


### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

