// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-recommender
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {HttpServer} from '@loopback/http-server';
import * as dotenv from 'dotenv';
import express from 'express';
import {ParamsDictionary} from 'express-serve-static-core';
const recommendations = require('../data/recommendations.json');
dotenv.config();

export function createRecommendationServer(
  port = process.env.THANGTM_PORT_RECOMMENDER ? parseInt(process.env.THANGTM_PORT_RECOMMENDER) : 9002,
  host: string | undefined = undefined,
) {
  const app = express();

  app.get('/:userId', (req: express.Request, res: express.Response) => {
    let userId = (req.params as ParamsDictionary).userId || 'user001';
    if (!(userId in recommendations)) {
      userId = 'user001';
    }
    res.send(recommendations[userId] || []);
  });

  return new HttpServer(app, {port, host});
}

export async function restMain(
  port = process.env.THANGTM_PORT_RECOMMENDER ? parseInt(process.env.THANGTM_PORT_RECOMMENDER) : 9002,
  host: string | undefined = undefined,
) {
  const server = createRecommendationServer(port, host);
  await server.start();
  console.log('Recommendation REST server is running at ' + server.url + '.');
  return server;
}
