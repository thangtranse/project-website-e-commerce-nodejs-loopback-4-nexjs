// // eslint-disable-next-line @typescript-eslint/interface-name-prefix
// export interface IEmail {
//   reason: String | null | undefined,
//   email: String | null | undefined,
//   to: String,
//   from: String,
//   templateId: String | undefined,
//   token: String | undefined
// }


// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IEmail {
  to: string,
  from?: string,
  subject: string,
  html: string
}
