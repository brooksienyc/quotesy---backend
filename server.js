import db from "./db/connection.js"
import routes from "./routes/index.js"
import express from "express"
import cors from "cors"
import chalk from "chalk"

const app = express()
const PORT = process.env.PORT || 8080

console.log(process.env.XRapidAPIKey);

app.use(express.json())
app.use(cors())
app.use("/quotes", routes)

db.on("connected",()=>{
    console.clear()
    console.log(chalk.blue("Connected to Database"))
    app.listen(PORT, () => {
        process.env.NODE_ENV === "production"
          ? console.log(`Express server running in production on port ${PORT}\n\n`)
          : console.log(
              `Express server running in development on: http://localhost:${PORT}`
            );
      });
})