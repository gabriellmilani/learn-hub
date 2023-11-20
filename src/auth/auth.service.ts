import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { ReturnLogin } from './dto/return-login.dto';
import { ReturnUserDto } from 'src/user/dto/return-user.dto';
import { LoginPayload } from './dto/login-payload.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto): Promise<ReturnLogin> {
        const user: User | undefined = await this.userService.findUserByEmail(loginDto.email)
            .catch(() => undefined);

        const isMatch = await compare(loginDto.password, user?.password || '');

        if (!user || !isMatch) {
            throw new UnauthorizedException('Email or password invalid');
        }

        return {
            accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
            user: new ReturnUserDto(user),
        };
    }

}
