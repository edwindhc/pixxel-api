import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocumentExtended } from './entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { AuthenticatedUser } from './entities/interfaces'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocumentExtended>,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...rest } = createUserDto
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const createdUser = new this.userModel({
      ...rest,
      password: hashedPassword
    })
    return await createdUser.save()
  }

  async validateUser(
    email: string,
    password: string
  ): Promise<AuthenticatedUser> {
    const user = await this.userModel.findOne({ email })

    if (user && (await user.validatePassword(password))) {
      const result = { ...user.toObject() }
      delete result.password
      return result
    }
    throw new UnauthorizedException('Invalid credentials')
  }

  async login(user: AuthenticatedUser) {
    const payload = { ...user }
    return {
      ...payload,
      access_token: this.jwtService.sign(payload)
    }
  }
}
