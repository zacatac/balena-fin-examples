# balena-fin-examples
A collection of examples for the Balena Fin board  wrapped as a resin.io multi-container application. This collection will be improved with more examples over time, make sure to check it out from time to time!

Service | What it does
------------ | ------------
wifi-connect | if the Balena Fin is not connected, exposes a WiFi access point with Captive Portal ( SSID: `Fin`, PSK: `Balena`) that allows the configuration of WiFi credentials. For more info, please refer to the [wifi-connect repository](https://github.com/resin-io/resin-wifi-connect)
rgb-led | blinks the Balena Fin RGB LED with a random color every 3 seconds
artik020 | Loads OTA bluetooth bootloader to the Artik020 module and a sample application with BLE characteristics and the possibility to use OTA updates
## How to deploy this example via resin.io

```bash
git clone git@github.com:resin-io/balena-fin-examples.git
git remote add resin <YOUR_RESIN_USERNAME>@git.resin.io:<YOUR_RESIN_USERNAME>/<YOUR_RESIN_APP_NAME>.git
git push resin master
```
## How to deploy this example locally via resin-cli

1. Install [resin-cli](https://github.com/resin-io/resin-cli/blob/21a3b8284519d5ca49d296713a046ad217658f09/doc/cli.markdown#install-the-cli)
2. Deploy this application via [resin deploy](https://github.com/resin-io/resin-cli/blob/21a3b8284519d5ca49d296713a046ad217658f09/doc/cli.markdown#deploy-appname-image)
