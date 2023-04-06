import { ForbiddenException, Injectable } from "@nestjs/common";
import { User, Bookmark, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";
import { config } from "process";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
        ) {}

    async signup(dto: AuthDto) {
        //hash password
        const hash = await argon.hash(dto.password)
        //save user
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: hash
                }
            })
            console.log("Displaying user from signp service try block", user)
            // delete user.hash
            return this.signToken(user.id, user.email)
        }
        catch (error) {
            console.log("Reached catch block of signup service")
            console.log("Type of error is",typeof error)
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.log("Is a prisma error")
                // console.log(error)
                if (error.code === 'P2002') {
                    console.log("Is a duplicate error")
                    throw new ForbiddenException('Credentials taken')
                }
            }
            console.log("Not a prisma error")
            throw error
        }

        // return {msg: "I am signed up"}
    }

    async signin(dto: AuthDto) {
        // find user by email
        const user = await this.prisma.user.findFirst({
            where: {
                email: dto.email,
            },
        })
        // if user doesnt existdata throw exception  // guard condition
        if (!user) {
            throw new ForbiddenException('User not found')
        }

        // compare password     // guard condition
        const matchPass = await argon.verify(user.hash, dto.password)

        // if password incorrect throw exception
        if (!matchPass) {
            throw new ForbiddenException('Credentials incorrect')
        }

        return this.signToken(user.id, user.email)
    }

    async signToken(userId: number,email: string): Promise<{access_token: string}>{
        const payload = {
            sub: userId,
            email
        }    
        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(payload,{
            expiresIn: '15m',
            secret: secret
        })
        
        return {access_token: token}
    }

}