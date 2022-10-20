const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8000 });

const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case "publishers/ADD": {
        broadcast(
          {
            type: "publishers/ADDED",
            payload: data.payload,
          },
          ws
        );
        break;
      }
      case "publishers/ADD/GAME":
        broadcast(
          {
            type: "publishers/ADDED/GAME",
            payload: data.payload,
          },
          ws
        );
        break;
      case "publishers/DELETE/GAME":
        broadcast(
          {
            type: "publishers/DELETED/GAME",
            payload: data.payload,
          },
          ws
        );
        break;
      case "publishers/DELETE":
        broadcast(
          {
            type: "publishers/DELETED",
            payload: data.payload,
          },
          ws
        );
        break;
      case "publishers/UPDATE":
        broadcast(
          {
            type: "publishers/UPDATED",
            payload: data.payload,
          },
          ws
        );
        break;
      case "games/ADD":
        broadcast(
          {
            type: "games/ADDED",
            payload: data.payload,
          },
          ws
        );
        break;
      case "games/UPDATE":
        broadcast(
          {
            type: "games/UPDATED",
            payload: data.payload,
          },
          ws
        );
        break;
      case "games/DELETE":
        broadcast(
          {
            type: "games/DELETED",
            payload: data.payload,
          },
          ws
        );
        break;
      case "games/DELETE/PUBLISHERS/GAMES":
        broadcast(
          {
            type: "games/DELETED/PUBLISHERS/GAMES",
            payload: data.payload,
          },
          ws
        );
        break;
      default:
        break;
    }
  });
});
