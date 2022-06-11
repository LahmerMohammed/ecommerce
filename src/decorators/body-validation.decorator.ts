import { deepParseJson } from 'deep-parse-json';
import {  validate, validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";



export const BodyValidation = createParamDecorator(
  async (Dto: any , ctx: ExecutionContext) => {

    // parse formData
    let body = deepParseJson(ctx.switchToHttp().getRequest().body);

    body = body.body || body;    

    const dto = plainToClass(Dto,body);
    
    try{
      await validateOrReject(dto);

    }catch(errors){
      
      var constraints = []
      
      if( errors.length > 0){

        errors.forEach(error => {
 
         for(var key in error.constraints){
           constraints.push(error.constraints[key])
        }
      });  
     }
     throw new BadRequestException(constraints)
    }

    return dto;

  }
)