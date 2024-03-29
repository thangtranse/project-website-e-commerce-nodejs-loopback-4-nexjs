// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {ApplicationConfig} from '@loopback/core';
import * as dotenv from 'dotenv';
import {ShoppingApplication} from './application';
export {PackageInfo, PackageKey, ShoppingApplication} from './application';

dotenv.config();

export async function main(options?: ApplicationConfig) {
  const app = new ShoppingApplication(options);

  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
