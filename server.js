const http = require('http');

const server = http.createServer((req, res) => {
    const chunks = [];
    req.on("data", (chunk) => {
        chunks.push(chunk);
        console.log("data chunks");
    });
    req.on("end", ()=>{
        let body = Buffer.concat(chunks).toString();
        //console.log(body);
        console.log(req.url);

        let stringRes = "";

        switch(req.url){
            case "/": 
                //res.write("Base Path option"); 
                stringRes = "Base Path result";
                break;
            case "/somePath": 
                //res.write("somePath option"); 
                stringRes = "somePath result";
                break;
            default: res.setHeader("Default", "true");
        }
        res.writeHead(200, {
            'content-type':'text/plain'
        })
        .end(stringRes);
    });
});

server.listen(process.env.PORT_NUMBER || 3000, ()=> console.log("Listening... "));