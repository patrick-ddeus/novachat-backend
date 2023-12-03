import { Controller, Get, UseGuards, Param, Patch, Body } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { ProfileService } from './profile.service';
import { AuthGuard } from '../guards/auth-guard';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Controller('/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':userId')
  @UseGuards(AuthGuard)
  getOneProfile(@Param('userId', ParseIntPipe) userId: number) {
    return this.profileService.getOneProfile(userId);
  }

  @Patch(':userId')
  @UseGuards(AuthGuard)
  patchProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(
      body.email,
      body.username,
      body.aboutMe,
      userId,
    );
  }
}
