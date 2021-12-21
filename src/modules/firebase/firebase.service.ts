 import { ref, getStorage } from 'firebase/storage';
import { Bucket } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import * as admin from 'firebase-admin';
import { format } from 'prettier';



@Injectable()
export class FirebaseService{

  private bucket: Bucket;

  public constructor()
  {
 
    //this.bucket = admin.storage().bucket("gs://ecommerce-file-storage-c603e.appspot.com");
  }

  public async uploadFile(file: Express.Multer.File , filePath: string) {

    
    return new Promise((resolve , reject) => {

      let bucket = admin.storage().bucket("gs://ecommerce-file-storage-c603e.appspot.com");


      let fileUpload = bucket.file(filePath);

      const blobStream = fileUpload.createWriteStream({
        metadata:{
          contentType: file.mimetype,
          
        }
      });
      
      blobStream.on('error', (error) => {
        reject('Something is wrong! Unable to upload at the moment.');
      });
  
      blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
        resolve(url);
      });
  
      blobStream.end(file.buffer);
    })

    

  }

  public async uploadFiles(uploadFilesDto: {basePath: string , images: Array<Express.Multer.File>}) {

    uploadFilesDto.images.forEach((file) => {

      this.uploadFile(file , `${uploadFilesDto.basePath}/${uuidv4()}`)
    });

  }

  public async getFileByID(fileName: string) {}


}