import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { WebSocketServer } from "ws";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number.parseInt(process.env.PORT || "8080", 10);
const WS_PATH = "/ws";

function json(res, status, body) {
  const text = JSON.stringify(body, null, 2);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  res.end(text);
}

function text(res, status, body) {
  res.writeHead(status, {
    "content-type": "text/plain; charset=utf-8",
    "cache-control": "no-store",
  });
  res.end(body);
}

async function sendFile(res, filePath, contentType) {
  try {
    const buf = await fs.readFile(filePath);
    res.writeHead(200, {
      "content-type": contentType,
      "cache-control": "no-store",
    });
    res.end(buf);
  } catch (e) {
    text(res, 404, `Not found: ${path.basename(filePath)}`);
  }
}

const server = http.createServer(async (req, res) => {
  if (!req.url) return text(res, 400, "Bad request");

  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (url.pathname === "/health") return json(res, 200, { ok: true });

  if (url.pathname === "/" || url.pathname === "/index.html") {
    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>websocket1</title>
    <style>
      body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; padding: 20px; }
      code { background: rgba(0,0,0,0.06); padding: 2px 6px; border-radius: 999px; }
      a { display: inline-block; margin: 8px 0; }
    </style>
  </head>
  <body>
    <h1>websocket1</h1>
    <div>WebSocket endpoint: <code>ws://localhost:${PORT}${WS_PATH}</code></div>
    <div style="margin-top: 14px">
      <a href="/client-a.html">Open client A</a><br />
      <a href="/client-b.html">Open client B</a>
    </div>
  </body>
</html>`;
    res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
    return res.end(html);
  }

  if (url.pathname === "/client-a.html") {
    return sendFile(res, path.join(__dirname, "client-a.html"), "text/html; charset=utf-8");
  }
  if (url.pathname === "/client-b.html") {
    return sendFile(res, path.join(__dirname, "client-b.html"), "text/html; charset=utf-8");
  }

  return text(res, 404, "Not found");
});

const wss = new WebSocketServer({ noServer: true });

function safeJsonParse(s) {
  if (typeof s !== "string") return null;
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

function broadcast(obj) {
  const payload = JSON.stringify(obj);
  for (const client of wss.clients) {
    if (client.readyState === client.OPEN) client.send(payload);
  }
}

wss.on("connection", (socket) => {
  socket.on("message", (data) => {
    const raw = typeof data === "string" ? data : data?.toString?.("utf8") || "";
    const msg = safeJsonParse(raw);

    if (!msg || typeof msg !== "object") {
      broadcast({ type: "system", text: `raw: ${raw}`, ts: Date.now() });
      return;
    }

    if (msg.type === "ping") {
      socket.send(JSON.stringify({ type: "system", text: "pong", ts: Date.now() }));
      return;
    }

    if (msg.type === "join") {
      broadcast({
        type: "system",
        text: `${msg.name || "someone"} joined${msg.room ? ` (${msg.room})` : ""}`,
        ts: Date.now(),
      });
      return;
    }

    if (msg.type === "chat") {
      broadcast({
        type: "chat",
        room: msg.room || undefined,
        name: msg.name || "anon",
        text: msg.text || "",
        ts: typeof msg.ts === "number" ? msg.ts : Date.now(),
      });
      return;
    }

    broadcast({ type: "system", text: `unknown type: ${msg.type}`, ts: Date.now() });
  });
});

server.on("upgrade", (req, socket, head) => {
  try {
    const url = new URL(req.url || "", `http://${req.headers.host || "localhost"}`);
    if (url.pathname !== WS_PATH) {
      socket.destroy();
      return;
    }

    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  } catch {
    socket.destroy();
  }
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`HTTP  http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`WS   ws://localhost:${PORT}${WS_PATH}`);
});

