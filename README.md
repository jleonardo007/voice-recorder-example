# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Explanation

When we develop a web app we can think browsers like a swiss knifes, these include a bunch of utilities (APIs), one of them is get media devices access througth `mediaDevices` API from the `navigator` object, this allows to devs create features related with the user media devices, this features migth be create voice notes, like Whatsapp Web does.

Today we gonna create an app that records the user's voice and then saves the recorded voice on a `<audio>` tag will be played later, this app look likes this

![recorder app](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oaub4ck5mn43nmrgds06.gif)

Apart `mediaDevices` API we require

- `MediaRecorder` constructor, this creates a recorder object from the requested media device througth `mediaDevices.getUserMedia()` method.
- `Blob` constructor, this one allows create a blob object from the data adquired from `MediaRecorder` instance.
- `URL.createObjectURL(blob)` method, this creates a URL, the URL contains the data (voice) create previously from the `Blob` instance and it is gonna be use like `<audio src=URL/`.

If you don't understand, don't worry, I'll explain you below. First, look at the `<App/>` component.

![app component](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1dukjr5ni7u7o5k550xj.png)

`<App/>` consumes a custom hook that provides the recorderState and several handlers. If you don't know how to use a custom hook I share with you a [post](https://dev.to/jleonardo007/keep-your-react-components-clean-with-custom-hooks-j74) about this.

The recorderState is like this:
![recorder state](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yr3daou2rjwmhvxqto8s.png)

- `recordingMinutes` and `recordingSeconds` are use to show the recording time and `initRecording` initializates the recorder.
- The other parts of the state, `mediaStream` will be the media device provide by `mediaDevices.getUserMedia()` and `mediaRecorder` will be the instance of `MediaRecorder`, `audio` will be the URL mentioned previously.

`mediaStream` is set by the handler `startRecording`
![start recording](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k2k92emx5u4c6vn4xdzd.png)

After set the `mediaStream`, `MediaRecorder` instance is created
![create media stream](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nx0j3vm21b6x2slg94sp.png)

Then `audio` is set
![set audio](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jj3ff17wa0rwob4vkdzi.png)

To adquire the voice and create the audio `mediaRecorder` needs create two event listeners `ondataavailable` and `onstop` the first one gets chunks of the voice and pushes it to the array `chunks` and the second one is use to create the blob througth `chunks` then audio is created. The stop event is fired by `saveRecording` handler or the effect cleanup function, the cleanup function is called when recording is cancel.

![save recording](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sd53zppdwtx2iq0itslj.png)

Now take a look at the components `<RecorderControls/>` and `<RecordingsList/>`.

**`<RecorderControls/>`**
![recorder controls](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xyp15ontihkkr7d7bauo.png)

`<RecorderControls/>` have the prop handlers and this is used by the jsx

**`<RecordingsList/>`**
![recordings list](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g78xyklm1877jxiegs78.png)

`<RecordingsList/>` receives `audio` and consumes a custom hook that pushes the audio created previously.

![use recorginds list](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r9hlinqgisuea4e4tiz6.png)

The handler `deleteAudio` is like this
![delete audio](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3xq9g3hy9108qvyqdetz.png)

And that's it! With React we can make use of `useEffect` to access the user devices and create related features.
