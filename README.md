# Make Your Own Artificial Intelligence Driven Web App

The app will capture images and then apply deep learning to identify and classify objects in the image.

Requirements:

- [ ] gmail account
- [ ] npm & node.js (test with `npm --version`)
- [ ] git (test with `git --version`)
- [ ] webcam
- [ ] internet connection

## initial

1. Clean up any previous solutions with the provided script; just run `npm run step-0`
1. Install the firebase cli and login by running `npm run step-1`

## Firebase

To serve and eventually host our app, we will use [Firebase](https://firebase.google.com/).

Firebase provides access to many of the same resource and services as [Google Cloud Platform](https://cloud.google.com/) with a few differences

- Firebase can be uses without a credit card. Both Google Cloud Platform and Firebase offer free trials, but Google Cloud Platform requires a credit card to start.
- Firebase offers a small subset of the resources and services that Google Cloud Platform does, but those that it does offer are what is most commonly used for simple applications.

Firebase is ideal for experimental or early stage projects.

1. Login to [Firebase](https://firebase.google.com/) (may need to login with Google credentials)
1. Create a project
   <br>![create a project](./doc/fb_intro.gif 'Create a project')
1. Configure hosting
   - View setup instructions
     <br>![setup hosting via website](./doc/setup_hosting.gif 'Setup hosting via website')
   - Setup hosting via the CLI
     <br>![setup hosting via cli](./doc/setup_hosting_cli.gif 'Setup hosting via CLI')
     - run `firebase init` or just `npm run step-2`, which does exactly that
1. Serve the default app: `firebase serve` (or `npm run step-3`)
1. visit http://localhost:5000 to see the default app
1. Deploy the default app: `firebase deploy` (or `npm run step-4`)
1. Visit your app running on the web at the "Hosting URL"
   <br>![after running deploy command](./doc/hosting_success.png 'After running deploy command')

## Capture Images

We will base our app on the excellent article on MDN about [Taking still photos with getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Taking_still_photos#).

This article has great explanations of the concepts used as well as source code that we can download to run the app ourselves.

I encourage everyone to have a look at the article for more information once we are done.

For now, we will simply copy the source code and use it as the foundation of our app using the provided script.

1. Run `npm run step-5` this will replace the default app
1. Run `firebase serve` (or `npm run step-6`) to see the new app
1. Run `firebase deploy` (or `npm run step-7`) to deploy the new version
1. Visit your app at the hosting url again to see the image capture app

## Add Machine learning

You can access a variety of pretrained models from https://www.tensorflow.org/js/models which are ready to use. For our application we will use the [object detection model](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd)

1. Add the required scripts to public/index.html to load the model:

   - ![HTML change](./doc/index_change.png 'HTML change')
   - ```html
     <!-- Load TensorFlow.js. This is required to use coco-ssd model. -->
     <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
     <!-- Load the coco-ssd model. -->
     <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd"></script>
     ```

1. Update the Javascript code to use the model and identify objects in the image. Add the following changes to public/capture.js:

   1. Change #1: Create a function to load the machine learning model and store it for later

      - ![JS change 1](./doc/js_change_1.png 'JS change #1')
      - ```javascript
        var model = null;

        function getModel() {
          return new Promise((resolve) => {
            if (model) {
              resolve(model);
            }
            cocoSsd.load().then((loadedModel) => {
              model = loadedModel;
              resolve(model);
            });
          });
        }
        ```

   2. Change #2: Load the machine learning model and store it for later
      - ![JS change 2](./doc/js_change_2.png 'JS change #2')
      - ```javascript
        getModel();
        ```
   3. Change #3: Use the machine learning model to predict the objects in the picture and label them in the picture

      - ![JS change 3](./doc/js_change_3.png 'JS change #3')
      - ```javascript
        var img = document.getElementById('photo');
        getModel().then((model) => {
          // detect objects in the image.
          model.detect(img).then((predictions) => {
            console.log('Predictions: ', predictions);
            context.font = '24px serif';
            context.strokeStyle = 'green';
            context.fillStyle = 'green';

            for (const prediction of predictions) {
              const [x, y, height, width] = prediction.bbox;
              context.strokeRect(x, y, height, width);
              context.fillText(prediction.class, x, y);
            }

            const data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
          });
        });
        ```

1. Run `firebase serve` to see the new version running locally
1. Run `firebase deploy` to deploy the new vewsion when it's working
1. Visit the app running on the hosted url
   - ![Running example](./doc/app_example.png 'Running example')
1. Share the app you built, and have some fun!

## Extra Credit

1. Make the app run continuously to identify objects whenever they are in view of the camera
1. Make the app your own, with custom style, layout, and information
1. Make the app responsive (so that it works well on a phone)
1. Show an alert whenever an interesting object is detected.

## Notes

- This can be done on [replit](https://replit.com/) with the following changes
  - logging in is a bit cumbersome (need to manually visit challenge url)
  - serve via `firebase serve -o 0.0.0.0`
