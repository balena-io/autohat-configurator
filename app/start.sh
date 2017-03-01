#!/bin/bash

export DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

# Enable i2c and other interfaces
modprobe i2c-dev || true

# start app
node /usr/src/app/index.js
