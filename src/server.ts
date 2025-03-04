import { Server } from "http";
import app from "./app";
import dbConnect from "./app/utils/dbConnect";

const port = 5000;

async function main() {
  await dbConnect();
  const server: Server = app.listen(port, () => {
    console.log(`server running at ${port} port`);
  });

  const exitHandler = () => {
    if(server){
      server.close(()=> {
        console.log('Server closed');
      })
    }
    process.exit(1)
  }


  process.on('uncaughtException', (error)=> {
    console.log(error);
    exitHandler();
  })

  process.on('unhandledRejection', (error)=> {
    console.log(error);
    exitHandler();
  })
}

main();