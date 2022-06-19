import { HttpException, HttpStatus, StreamableFile } from '@nestjs/common';
import { Bucket  } from '@google-cloud/storage';
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
    let bucket = admin.storage().bucket("gs://ecommerce-file-storage-c603e.appspot.com");

    
    let fileUpload = bucket.file(filePath);

    const blobStream = fileUpload.createWriteStream({
        metadata:{
          contentType: 'image/jpg',
        }
      });
      
    blobStream.on('error', (error) => {
      console.error('Something is wrong! Unable to upload at the moment.');
      console.error(error);
    });
  
    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
      console.info(url);
    });
  
    blobStream.end(file.buffer);
  }

  public async uploadFiles(uploadFilesDto: {basePath: string , images: Array<Express.Multer.File>}) {

    uploadFilesDto.images.forEach(async (file) => {

      await this.uploadFile(file , `${uploadFilesDto.basePath}/${uuidv4()}.jpg`)
    });

  }
  /**
   * 
   * download only one image of a product (the main one) to show in search page 
   */
  public async dowbloadFile(user_id: string , product_id: string) : Promise<StreamableFile> {
    
    const dir = `${user_id}/${product_id}`
    let bucket = admin.storage().bucket("gs://ecommerce-file-storage-c603e.appspot.com");
    
    const files = await bucket.getFiles({
      autoPaginate: false,
      prefix: dir
    });

    const file_name = files[0][0].name;

    const respoonse = await bucket.file(`${file_name}`).download();
    const buffer = respoonse[0];

    return new StreamableFile(buffer); 
  }


  async deleteFile(file_path: string)
  {
    let bucket = admin.storage().bucket("gs://ecommerce-file-storage-c603e.appspot.com");

    const file = bucket.file(file_path);

    return file.delete( (err: Error , response ) => {
      if( err )
        throw new HttpException(err.message , HttpStatus.BAD_GATEWAY);
      
      return response;
    })
  }


}