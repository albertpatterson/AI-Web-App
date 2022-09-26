# Make Your Own Artificial Intelligence Web App

The app will capture images and then apply deep learning to identify and classify objects in the image.

## Firebase

To serve and eventually host our app, we will use [Firebase](https://firebase.google.com/).

Firebase provides access to many of the same resource and services as [Google Cloud Platform](https://cloud.google.com/) with a few differences

- Firebase can be uses without a credit card. Both Google Cloud Platform and Firebase offer free trials, but Google Cloud Platform requires a credit card to start.
- Firebase offers a small subset of the resources and services that Google Cloud Platform does, but those that it does offer are those most commonly used for simple applications.

Firebase is ideal for experimental or early stage projects.

1. Login to Firebase (may need to login with Google credentials)
1. Create a project
   ![create a project](./doc/fb_intro.gif 'Create a project')
1. Configure hosting
   - View setup instructions
     ![setup hosting via website](./doc/setup_hosting.gif 'Setup hosting via website')
   - Setup hosting via the CLI
     ![setup hosting via cli](./doc/setup_hosting_cli.gif 'Setup hosting via CLI')
1. Serve the default app: `firebase serve`
1. visit http://localhost:5000 to see the default app
1. Deploy the default app: `firebase deploy`
1. Visit your app running on the web at the "Hosting URL"
   ![after running deploy command](./doc/hosting_success.png 'After running deploy command')

## Capture Images

We will base app on the excellent article on MDN about [Taking shill photos with getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Taking_still_photos#).

This article has excellent explanations of the concepts used as well as source code that we can download to run the app ourselves.

I encourage everyone to have a look at the article for more information once we are done.

For now, we will simply copy the source code and use it as the foundation of our app using the `setup.sh` script.

1. Run `./setup.sh` this will replace the default app
1. Run `firebase deploy`
1. Visit your app at the hosting url again to see the image capture app

## Add Machine learning

You can access a variety of pretrained models from https://www.tensorflow.org/js/models which are ready to use. For our application we will use the [object detection model](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd)

1. Add the required scripts to public/index.html to load the model.
2. Update the Javascript code to use the model and identify objects in the image.
