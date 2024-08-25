const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const {sequelize, Demo, Frame} = require('./model')
const nodeHtmlToImage = require('node-html-to-image')
const app = express();
app.use(bodyParser.json());
app.use(cors())
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.get('/demos', async (req, res) => {
  try {
    const demos = await Demo.findAll({
      include: "frames",
    });

    const demosResponse = [];

    for (const demo of demos) {
      const sortedFrames = demo.frames.sort((a, b) => a.order - b.order);

      const framesWithImages = await Promise.all(sortedFrames.map(async (frame) => {
        const image = await nodeHtmlToImage({
          html: frame.html,
          puppeteerArgs: { args: ['--no-sandbox'] }
        });

        return {
          ...frame.dataValues,
          image: image.toString('base64'),
        };
      }));

      demosResponse.push({
        ...demo.dataValues,
        frames: framesWithImages,
      });
    }

    res.json(demosResponse);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put('/frames/:id', async (req, res) => {
  try {
    const frame = await Frame.findOne({ where: { id: req.params.id } });
    if (frame) {
      await frame.update({
        html: req.body.html,
      });
      res.json(frame);
    } else {
      res.status(404).send('Frame not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = app;
