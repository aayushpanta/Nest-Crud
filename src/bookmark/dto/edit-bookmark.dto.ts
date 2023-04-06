import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class EditBookmarkDto{
    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    title?: string

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    description?: string
    
    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    link?: string
}
