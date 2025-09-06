import mongoose from "mongoose";
import app from "./src/app.js";
import config from "./src/config/index.js";

(async()=>{
    try{
        console.log("Trying to connect:", config.MONGODB_URL);
        await mongoose.connect(config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        tlsAllowInvalidCertificates: true,  // 👈 workaround for SSL handshake errors
        })
        console.log("Database Connected!!!")

        app.on('error', (err)=>{
            console.error("ERROR: ", err);
            throw err
        })

        const onListening = () =>{
            console.log(`Listening on port ${config.PORT}`);
        }

        app.listen(config.PORT, onListening)

    }catch(err){
        console.error("❌ Mongoose connection error:", err.message);
        console.error("ERROR: ",err)
        throw err
    }
})()