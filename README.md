# Basic Apollo Federation Demo

**Installation:**

```bash
npm i apollo-server-errors

npm i && npm run dev

https://apapacho-api.staging.ixulabs.com/

"dev": "concurrently -k npm:dev:*",
    "dev:access": "nodemon -r esm ./devs/access.js",
    "dev:content": "nodemon -r esm ./devs/content.js",
    "dev:payments": "nodemon -r esm ./devs/payments.js",
    "dev:gateway": "wait-on tcp:4001 tcp:4002 tcp:4003 && nodemon -r esm ./index.js"

killall -9 node
```

**Tutorial:**

[Read the full tutorial on dev.to here](https://dev.to/mandiwise/getting-started-with-apollo-federation-and-gateway-4739) 👩‍💻
[Based on:](https://github.com/mandiwise/basic-apollo-federation-demo)