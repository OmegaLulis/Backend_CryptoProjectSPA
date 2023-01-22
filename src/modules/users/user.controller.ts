import {Body, Controller, Delete, Patch, Req, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {UpdateUserDTO} from "./dto";
import {JwtAuthGuard} from "../../guards/jwt-guard";
import {ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @ApiTags("API")
    @ApiResponse({status:200, type: UpdateUserDTO})
    @UseGuards(JwtAuthGuard)
    @Patch()
    updateUser(@Body() updateDto: UpdateUserDTO, @Req() request) : Promise<UpdateUserDTO>{

        const user = request.user
        return this.usersService.updateUser(user.email, updateDto)

    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteUser(@Req() request): Promise<boolean>{
        const user = request.user
        return this.usersService.deleteUser(user.email)
    }

}
