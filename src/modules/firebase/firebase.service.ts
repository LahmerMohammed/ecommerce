import { ref, getStorage } from 'firebase/storage';
import { Bucket } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

import * as admin from 'firebase-admin';
import { format } from 'prettier';



@Injectable()
export class FirebaseService{

  private bucket: Bucket;

  public constructor()
  {
 
    this.bucket = admin.storage().bucket("gs://ecommerce-file-storage-c603e.appspot.com");
  }

  public async uploadFile(file: Express.Multer.File) {
    

    return new Promise((resolve , reject) => {

      let fileUpload = this.bucket.file(file.filename);

      const blobStream = fileUpload.createWriteStream({
        metadata:{
          contentType: file.mimetype
        }
      });
  
      blobStream.on('error', (error) => {
        reject('Something is wrong! Unable to upload at the moment.');
      });
  
      blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const url = format(`https://storage.googleapis.com/${this.bucket.name}/${fileUpload.name}`);
        resolve(url);
      });
  
      blobStream.end(file.buffer);
    })

    

  }

  public async uploadFiles(files: Array<Express.Multer.File>) {}

  public async getFileByID(fileName: string) {}


}