# @ledgerhq/hw-transport Issue - SSCCE

This minimal, complete, and verifiable example demonstrates an issue that occurs when using incompatible versions of the npm packages '@ledgerhq/hw-transport' and '@ledgerhq/hw-transport-webusb'. This SSCCE specifically uses the '@ledgerhq/hw-transport-webusb' packages versions 6.27.13 and 6.27.14 simultaneously to replicate and demonstrate the problem.

## Problem Description

The issue arises when '@ledgerhq/hw-transport' is updated to a newer version (e.g., 6.28.3), while '@ledgerhq/hw-transport-webusb' remains at an older version (e.g., 6.27.13). This mismatch causes problems because of changes in the JS code generation in the new versions of the packages (https://diff.intrinsic.com/@ledgerhq/hw-transport-webusb/6.27.13/6.27.14).

Specifically, `TransportWebUSB` was declared as a class-function in the older versions, allowing creation without the `new` keyword. However, in the newer versions, `TransportWebUSB` is a class declaration, necessitating the creation of the object using the `new` keyword.

## Build and Run Instructions

The project uses the `parcel` build tool to facilitate running in a browser. Follow the instructions below to run this SSCCE:

1. Clone the repository.
2. Run `npm install` to install the required dependencies.
3. Start the example with `npm start`. This command will build the project and start a local server.
4. Open your browser and navigate to the server address (usually `http://localhost:1234` unless specified otherwise).
5. Follow the instructions displayed on the page to observe the error that results from the version mismatch.

By running this SSCCE, developers and others can gain a clear understanding of the issue caused by the mismatch in versions between the '@ledgerhq/hw-transport' and '@ledgerhq/hw-transport-webusb' packages. This understanding can help when troubleshooting related problems or updating these packages in other projects.
