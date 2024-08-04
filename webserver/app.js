let server = require("ws").Server;
let s = new server({ port: 8080 });

s.on("connection", (ws) => {
  ws.on("close", () => {
    console.log("I lost a client😢");
  });

  console.log("One more client for me😁");

  ws.on("message", (message) => {
    message = JSON.parse(message);

    if (message.type === "name") {
      ws.personName = message.data;
      return;
    }

    s.clients.forEach((client) => {
      if (client !== ws) {
        if (message)
          client.send(
            JSON.stringify({
              name: ws.personName,
              data: message.data,
            })
          );
      }
    });

    // if (message) ws.send(`From The Server: ${message}`);
  });
});
