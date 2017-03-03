# autohat-configurator

A Resin application that allows you to configure a AutoHAT Board for a specific device type/sku.

**Running instructions:**

* GIT push this application to device on Resin
* Connect a AutoHAT Board to be configured
* Visit the configuration UI at the device's IP  `http://devices-ip`
* Type in a Resin Device-Type in the UI or Device-Type[SKU] if the device type has different subtypes ( Example: raspberrypi3 or raspberrypi[zero] ) and hit program

**Bonus:**

Push this application to a Raspberry Pi with [Blinkt](https://shop.pimoroni.com/products/blinkt) attached to see programming status.

## License

Copyright 2017 Resinio Ltd.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

<http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
