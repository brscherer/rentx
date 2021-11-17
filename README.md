# 🚗 RentX

This is a [React Native](https://reactnative.dev/) project bootstrapped with [expo](https://expo.dev/).

It is a simplified version of a rental car app.

The node version used in this project is v16.13.0.

If you have [nvm](https://github.com/nvm-sh/nvm) installed, you can install the same version by getting into this project root folder and running `nvm install` to install the version specified at `.nvmrc` file, and `nvm use` to use this version.

## ✨ Features

In this app, users can rent cars, selecting it from a list, read about the car specificities, select the period of rent and confirm the total price which is calculated by the price of car times the period (days quantity).

## 🏃‍♂️ Running project

I recommend installing [expo](https://expo.dev/) globally in order to test this app on your on device, but if you have already configured your setup to run android/ios emulador, there is scripts to running on them as well.

Also, you have to install Expo app in your device.

- [Expo App (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)
- [Expo App (iOS)](https://apps.apple.com/app/expo-go/id982107779)

### Initial steps 

- Clone this repository and enter into its folder;
- Run `yarn` or `npm install` to install dependencies;

### Setting up server

In order to get the server communication with your device, you'll need change a small part of the server initialization script inside `package.json` file.
- First, you'll need the get your local ip (usually start with 192.168...)
- Then, change the `server` script in `package.json` accordingly to this format:

```
"server": "npx json-server ./src/services/server.json --watch --host <YOUR_IP_HERE> --port <PORT> --delay 700"
```

replace `<YOUR_IP_HERE>` by your current local IP.
replace `<PORT>` with the port number you want the server running (I've already type port 8081, but feel free to use the available port number you want)

> You can also change the `--delay` value to a higher or lower number, to simulate a delay time from requests

### With expo

After installing expo globally:

- Run `yarn server` to run json-server (which was configured in the previous topic);
- In another terminal, run `expo start` to run application;
- A new tab should be opened in your browser pointing to `http://localhost:19002/`
- Run the QR code at the bottom-left of screen with the Expo App you installed in your device
- The app should be loaded in your device

## ❔ What I used in this project

- [expo](https://expo.dev/).
- [Typescript](https://www.typescriptlang.org/docs/)
- [Styled Components](https://styled-components.com/docs)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native)
- [react-native-responsive-fontsize](https://www.npmjs.com/package/react-native-responsive-fontsize)
- [react-native-calendars](https://github.com/wix/react-native-calendars)
- [json-server](https://www.npmjs.com/package/json-server)

## 🚧 To Do

- Validate period to prevent user from renting already rented cars
- Implement integration tests with [react-native-testing-library](https://testing-library.com/docs/react-native-testing-library/intro)
- Implement social login with google and app store