// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-recommender
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

export * from '@loopback/http-server';
export * from './recommendation-grpc';
export * from './recommendation-rest';
import * as dotenv from 'dotenv';
import {grpcMain} from './recommendation-grpc';
import {restMain} from './recommendation-rest';


dotenv.config();

export async function main(
  config: {
    rest?: {host?: string; port?: number};
    grpc?: {port?: string};
  } = {rest: {port: process.env.THANGTM_PORT_RECOMMENDER ? parseInt(process.env.THANGTM_PORT_RECOMMENDER) : 9002}, grpc: {}},
) {
  // Enable the protocol by env var `RECOMMENDER_PROTOCOL`
  // If not set, both protocols are enabled
  const protocol = process.env.RECOMMENDER_PROTOCOL;
  if (config.rest) {
    if (protocol == null || protocol === 'rest')
      await restMain(config.rest.port, config.rest.host);
  }
  if (config.grpc) {
    if (protocol == null || protocol === 'grpc') grpcMain(config.grpc.port);
  }
}
