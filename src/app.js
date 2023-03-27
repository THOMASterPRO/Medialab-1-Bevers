const express = require('express');
const cors = require('cors');
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.post('/check', (req, res) => {
    console.log(`Received POST request for check`);

    const apiKey = "9c87b4c6-d8c4-428b-94de-87da5c348a32";
    const config = {
    method: "POST",
    url: "https://api.oneai.com/api/v0/pipeline",
    headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
    },
    data: {
        input: req.body.input,
        input_type: "article",
            content_type: "application/json",
            output_type: "json",
        multilingual: {
        enabled: true
        },
        steps: [
            // {
            //     skill: "numbers",
            //     params: {
            //       "reference_time": "2023-03-24T00:00",
            //       "locale": "nl-NL"
            //     }
            // },
            // {
            //     skill: "emotions"
            // },
            {
                skill: "sentiments"
            },
            {
                skill: "article-topics"
            },
            {
                skill: "summarize"
            }
        ],
    },
    };
    axios(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
        res.json(response.data).status(200);
    })
    .catch((error) => {
        console.log(error);
    });
});

app.post('/improve', (req, res) => {
    console.log(`Received POST request for improve`);

    const apiKey = "9c87b4c6-d8c4-428b-94de-87da5c348a32";
    const config = {
    method: "POST",
    url: "https://api.oneai.com/api/v0/pipeline",
    headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
    },
    data: {
        input: req.body.input,
        input_type: "article",
            content_type: "application/json",
            output_type: "json",
        multilingual: {
        enabled: true
        },
        steps: [
            {
                skill: "enhance"
            }
        ],
    },
    };
    axios(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
        res.json(response.data).status(200);
    })
    .catch((error) => {
        console.log(error);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
