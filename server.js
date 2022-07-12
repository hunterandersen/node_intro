const http = require("http");

const server = http.createServer((req, res) => {
  const chunks = [];
  req.on("data", (chunk) => {
    chunks.push(chunk);
  });
  req.on("end", () => {
    let body = Buffer.concat(chunks).toString();
    console.log("Navigating to: ", req.url, "with method:", req.method);

    if (req.method == "GET") {
      switch (req.url) {
        case "/":
          res.setHeader("statusCode", 200);
          res.write("Base Path option");
          break;
        case "/*":
          res.setHeader("statusCode", 200);
          res.write("somePath option");
          break;
        case "/about":
          res.setHeader("statusCode", 200);
          res.write(
            JSON.stringify({
              name: "Hunter",
              color: "Yellow",
              bowtie: "pristine",
              friendly: true,
              code_level: "awesome",
            })
          );
          break;
        default:
          res.setHeader("statusCode", 404);
          res.write("Endpoint Not Found");
      }
    } else if (req.method == "POST") {
      switch (req.url) {
        case "/echo":
          res.setHeader("statusCode", 200);
          res.write(body);
          break;
        default:
          res.setHeader("statusCode", 404);
          res.write("Endpoint Not Found");
      }
    }

    res.end();
  });
});

server.listen(process.env.PORT_NUMBER || 3000, () =>
  console.log("Listening... ")
);
