
const http = require("node:http");
const calculateTotal = require("./app");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");

  res.setHeader("Content-Type", "application/json");

  if (url.pathname === "/health") {
    res.writeHead(200);
    res.end(JSON.stringify({ status: "healthy" }));
    return;
  }

  if (url.pathname === "/total") {
    const price = Number(url.searchParams.get("price"));
    const quantity = Number(url.searchParams.get("quantity"));

    if (
      !Number.isFinite(price) ||
      !Number.isFinite(quantity) ||
      price < 0 ||
      quantity < 0
    ) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: "Invalid price or quantity" }));
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify({
      price,
      quantity,
      total: calculateTotal(price, quantity)
    }));
    return;
  }

  res.writeHead(200);
  res.end(JSON.stringify({
    application: "ShopEasy Lite",
    version: "1.0.1",
    message: "Welcome to ShopEasy Lite - Version 1.0.1!"
  }));
});

server.listen(3000, "0.0.0.0", () => {
  console.log("ShopEasy Lite running on port 3000");
});
