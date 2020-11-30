// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-file-transfer
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { inject } from '@loopback/core';
import {
  post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import { FILE_UPLOAD_SERVICE } from '../keys';
import { basicAuthorization } from '../services/basic.authorizor';
import { FileUploadHandler } from '../types';

/**
 * A controller to handle file uploads using multipart/form-data media type
 */
export class FileUploadController {
  /**
   * Constructor
   * @param handler - Inject an express request handler to deal with the request
   */
  constructor(
    @inject(FILE_UPLOAD_SERVICE) private handler: FileUploadHandler,
  ) { }

  @post('/files', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Files and fields uploads',
      },
    },
  })
  @authenticate('jwt')
  @authorize({ allowedRoles: ['admin'], voters: [basicAuthorization] })
  async fileUpload(
    @requestBody.file() request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      this.handler(request, response, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(FileUploadController.getFilesAndFields(request));
        }
      });
    });
  }

  /**
   * Get files and fields for the request
   * @param request - Http request
   */
  private static getFilesAndFields(request: Request) {
    let uploadedFiles = request.files;
    const mapper = (f: globalThis.Express.Multer.File) => ({
      fieldname: f.fieldname,
      originalname: f.originalname,
      encoding: f.encoding,
      mimetype: f.mimetype,
      size: f.size
    });

    let files: object[] = [];

    if (Array.isArray(uploadedFiles)) {
      files = uploadedFiles.map(mapper);
      // console.log(files)
      // console.log(uploadedFiles)
    } else {
      for (const filename in uploadedFiles) {
        files.push(...uploadedFiles[filename].map(mapper));
      }
    }

    return { files, fields: request.body };
  }

  // @post('/show-body', {
  //   responses: {
  //     200: {
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'object',
  //           },
  //         },
  //       },
  //       description: '',
  //     },
  //   },
  // })
  // async showBody(
  //   @requestBody({
  //     description: 'multipart/form-data value.',
  //     required: true,
  //     content: {
  //       'multipart/form-data': {
  //         // Skip body parsing
  //         'x-parser': 'stream',
  //         schema: { type: 'object' },
  //       },
  //     },
  //   })
  //   request: Request,
  //   @inject(RestBindings.Http.RESPONSE) response: Response,
  // ): Promise<Object> {

  //   const upload = multer({
  //     storage: multer.diskStorage({
  //       destination: path.join(__dirname, '../.sandbox'),
  //       filename: (req, file, cb) => {
  //         console.log("thangtran.application.filename", file.originalname)
  //         cb(null, file.originalname);
  //       }
  //     }),
  //     limits: {
  //       fileSize: 2097152 // 2MB
  //     }
  //   });

  //   return new Promise<object>((resolve, reject) => {
  //     upload.any()(request, response, (err: unknown) => {
  //       if (err) return reject(err);
  //       resolve({
  //         files: request.files,
  //         fields: (request as any).fields,
  //       });
  //     });
  //   });
  // }
}