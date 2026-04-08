# websocket1

Minimal WebSocket chat demo with **two HTML clients** + a tiny local server.

## Run

```bash
cd proto/websocket1
npm install
npm run dev
```

Then open:

- `http://localhost:8080/client-a.html`
- `http://localhost:8080/client-b.html`

WebSocket endpoint is:

- `ws://localhost:8080/ws`

## Why you saw the error

If you open the HTML directly via `file://...`, browsers treat `file:` as a **unique / opaque origin**, which can trigger security restrictions.
Serving the page over `http://localhost:...` avoids that and also makes it easy to run the WS server locally.

