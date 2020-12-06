// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  TokenServiceBindings
} from '@loopback/authentication-jwt';
import {AuthorizationComponent} from '@loopback/authorization';
import {BootMixin} from '@loopback/boot';
import {
  ApplicationConfig,
  BindingKey,
  createBindingFromClass
} from '@loopback/core';
import {
  model,
  property,
  RepositoryMixin,
  SchemaMigrationOptions
} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import fs from 'fs';
import _ from 'lodash';
import multer from 'multer';
import path from 'path';
import {
  EmailManagerBindings, FILE_UPLOAD_SERVICE, PasswordHasherBindings,

  STORAGE_DIRECTORY,
  UserServiceBindings
} from './keys';
import {User} from './models';
import {
  CategoryRepository, OrderRepository,

  PageHomeRepository, ProductRepository,

  ShoppingCartRepository,
  UserRepository
} from './repositories';
import {MyAuthenticationSequence} from './sequence';
import {EmailService} from './services/email.service';
import {BcryptHasher} from './services/hash.password.bcryptjs';
import {JWTService} from './services/jwt-service';
import {SecuritySpecEnhancer} from './services/jwt-spec.enhancer';
import {MyUserService} from './services/user-service';
import YAML = require('yaml');

/**
 * Information from package.json
 */
export interface PackageInfo {
  name: string;
  version: string;
  description: string;
}

export const PackageKey = BindingKey.create<PackageInfo>('application.package');

const pkg: PackageInfo = require('../package.json');

@model()
export class NewUser extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

export class ShoppingApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {rest: {port: process.env.THANGTM_PORT}}) {
    super(options);

    // Bind authentication component related elements
    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);
    this.component(AuthorizationComponent);

    this.setUpBindings();

    // Set up the custom sequence
    this.sequence(MyAuthenticationSequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);
    // Configure file upload with multer options
    this.configureFileUpload(options.fileStorageDirectory);
    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  /**
   * Configure `multer` options for file upload
   */
  protected configureFileUpload(destination?: string) {

    // Upload files to `dist/.sandbox` by default
    destination = destination ?? path.join(__dirname, '../.sandbox');

    this.bind(STORAGE_DIRECTORY).to(destination);

    /**
     * Tùy chọn lưu trữ dữ liệu (upload file)
     */
    const multerOptions: multer.Options = {
      limits: {
        fileSize: 2097152 // 2MB
      },
      storage: multer.diskStorage({
        destination,
        // Use the original file name as is
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    };
    // Configure the file upload service with multer options
    this.configure(FILE_UPLOAD_SERVICE).to(multerOptions);
  }

  setUpBindings(): void {
    // Bind package.json to the application context
    this.bind(PackageKey).to(pkg);

    // Bind bcrypt hash services
    this.bind(PasswordHasherBindings.ROUNDS).to(10);
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);

    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
    this.bind(EmailManagerBindings.SEND_MAIL).toClass(EmailService);
    this.add(createBindingFromClass(SecuritySpecEnhancer));
  }

  // Unfortunately, TypeScript does not allow overriding methods inherited
  // from mapped types. https://github.com/microsoft/TypeScript/issues/38496
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async start(): Promise<void> {
    // Use `databaseSeeding` flag to control if products/users should be pre
    // populated into the database. Its value is default to `true`.
    if (this.options.databaseSeeding !== false) {
      // await this.migrateSchema();
    }
    return super.start();
  }

  /**
   * Dùng để migrate dữ liệu mới
   * @param options
   */
  async migrateSchema(options?: SchemaMigrationOptions): Promise<void> {
    await super.migrateSchema(options);

    // Pre-populate Category
    const categoryRepo = await this.getRepository(CategoryRepository);
    await categoryRepo.deleteAll();
    const categoryDir = path.join(__dirname, '../fixtures/categories');
    const categoryFiles = fs.readdirSync(categoryDir);

    for (const file of categoryFiles) {
      if (file.endsWith('.yml')) {
        const productFile = path.join(categoryDir, file);
        const yamlString = fs.readFileSync(productFile, 'utf8');
        const item = YAML.parse(yamlString);
        await categoryRepo.create(item);
      }
    }

    // Pre-populate page
    const pageRepo = await this.getRepository(PageHomeRepository);
    await pageRepo.deleteAll();
    const pageDir = path.join(__dirname, '../fixtures/pages');
    const pageFiles = fs.readdirSync(pageDir);

    for (const file of pageFiles) {
      if (file.endsWith('.yml')) {
        const productFile = path.join(pageDir, file);
        const yamlString = fs.readFileSync(productFile, 'utf8');
        const item = YAML.parse(yamlString);
        await pageRepo.create(item);
      }
    }

    // Pre-populate products
    const productRepo = await this.getRepository(ProductRepository);
    await productRepo.deleteAll();
    const productsDir = path.join(__dirname, '../fixtures/products');
    const productFiles = fs.readdirSync(productsDir);

    for (const file of productFiles) {
      if (file.endsWith('.yml')) {
        const productFile = path.join(productsDir, file);
        const yamlString = fs.readFileSync(productFile, 'utf8');
        const product = YAML.parse(yamlString);
        await productRepo.create(product);
      }
    }

    // Pre-populate users
    const passwordHasher = await this.get(
      PasswordHasherBindings.PASSWORD_HASHER,
    );
    const userRepo = await this.getRepository(UserRepository);
    await userRepo.deleteAll();
    const usersDir = path.join(__dirname, '../fixtures/users');
    const userFiles = fs.readdirSync(usersDir);

    for (const file of userFiles) {
      if (file.endsWith('.yml')) {
        const userFile = path.join(usersDir, file);
        const yamlString = YAML.parse(fs.readFileSync(userFile, 'utf8'));
        const input = new NewUser(yamlString);
        const password = await passwordHasher.hashPassword(input.password);
        input.password = password;
        const user = await userRepo.create(_.omit(input, 'password'));

        await userRepo.userCredentials(user.id).create({password});
      }
    }

    // Delete existing shopping carts
    const cartRepo = await this.getRepository(ShoppingCartRepository);
    await cartRepo.deleteAll();

    // Delete existing orders
    const orderRepo = await this.getRepository(OrderRepository);
    await orderRepo.deleteAll();
  }
}
