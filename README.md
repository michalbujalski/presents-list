# Presents list
## Overview
Simple presents list. Just create a list of your presents and then send a link to your friends so they know what you want, and can confirm that they've already bought it for you.

## Features
- Sign in/ Sign out with social media and email
- List of your presents list
- Create new list
- List details with items/presents
- Edit your lists

## Stack
Libraries/frameworks used:
- Vue
- Vuex
- Firebase
- FirebaseUI
- Bulma

## Demo:
https://presents-dev.firebaseapp.com/

Leave me a present here ;) 
https://presents-dev.firebaseapp.com/Gc3FfJFJgdWRLVLuj2bxVgO8J832/lists/show/-L6x3_XrB1x_66MWvj_D


## How to use

Be sure to create `build\env.dev.js` and `build\env.prod.js` files that include your firebase configuration (see firebase documentation)

File should be as follows

```
module.exports = {
  firebaseConfig: {
    apiKey: '<API_KEY>',
    authDomain: '<AUTH_DOMAIN>',
    databaseURL: '<DB_URL>',
    projectId: '<PROJECT_ID>',
    storageBucket: '<STORAGE_BUCKET>',
    messagingSenderId: '<SENDER_ID>'
  }
}
```

To start:

```bash
$ npm install
```

To develop:

```bash
$ npm run dev
```

To build for production:

```bash
$ npm run build
```

---

