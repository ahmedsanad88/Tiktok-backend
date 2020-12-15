import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import videos from "./dbModel.js";
import Cors from "cors";

// app config
//  create instance
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
//  only for training as security issue
app.use(Cors());

// DB config
const connectUrl = 'mongodb+srv://Sanad:0U2lYaGFmdTG2aVC@cluster0.f79op.mongodb.net/tiktokdb?retryWrites=true&w=majority';

mongoose.connect(connectUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


// api endpoints
app.get('/', (req, res) => res.status(200).send("Hello World!!"));

app.get('/v1/posts', (req, res) => res.status(200).send(data));

app.get('/v2/posts', (req, res) => {
    videos.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.post('/v2/posts', (req, res) => {
    const dbVideos = req.body;

    videos.create(dbVideos, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

// listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
