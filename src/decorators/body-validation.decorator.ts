import {  validate, validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";



export const BodyValidation = createParamDecorator(
  async (Dto: any , ctx: ExecutionContext) => {
    
    const body = ctx.switchToHttp().getRequest().body;


    const dto = plainToClass(Dto , body);
   
  
    /* validate(dto).then(errors => {
      
      }) */

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