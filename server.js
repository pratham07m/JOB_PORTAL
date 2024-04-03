
//API Documentation
import SwaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

// packages imports
import  express from "express";

import "express-async-errors";

import dotenv from 'dotenv';

import cors from 'cors';

import morgan from 'morgan';

//securty packges
import helmet from "helmet";
import MongoSanitize from "express-mongo-sanitize";

//file import
import connectDB from "./config/db.js";
//routes import
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddelware from "./middelwares/eroMiddelware.js";
import jobsRoutes from './routes/jobsRoute.js';
import userRoutes from './routes/userRoutes.js';

//dot evn config
dotenv.config();

//mongodb connection
connectDB();

//swagger api config
const options = {
    definition : {
        openapi:"3.0.0",
        info:{
            tital:"job portal Application",
            description:"node Expressjs job portal application",
        },
        servers:[
            {
                url:"http://localhost:8080"
            },
        ],
    },

    apis: ["./routes/*.js"],
};
const spec = swaggerJSDoc(options);


//rest object
const app = express();

//middelwares
app.use(helmet());
app.use(MongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes (for "get" we use postman)
app.use('/api/v1/test' , testRoutes);
app.use('/api/v1/auth' , authRoutes);
app.use('/api/v1/user' , userRoutes);
app.use('/api/v1/job' , jobsRoutes);

//homeroute root
app.use("/api-doc" , SwaggerUi.serve,SwaggerUi.setup(spec));

//validation middelware
app.use(errorMiddelware)

//port
const PORT = process.env.PORT || 8080

//listen (3000 for react)
app.listen(8080 , () => {
    console.log(`node server is running in ${process.env.DEV_MODE} mode on port number ${PORT} `);
});
