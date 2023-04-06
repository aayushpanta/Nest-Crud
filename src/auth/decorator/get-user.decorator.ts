import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    const user = request.user

    // if (data) {
    //   console.log('get-user decorator,', data);
    //   console.log('get-user decorator,', request.user);

    //   return request.user[data];
    // }
    // return request.user;
    if(!user){
      console.log("user object is `undefined` here")
    }
    console.log("from getuser decorator",data ? user[data] : user)
    if(data){
      console.log("asking for",data,"value is",user[data])
    }
    return data ? user[data] : user
  },
);
