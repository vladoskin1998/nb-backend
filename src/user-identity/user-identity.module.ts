import { Module } from '@nestjs/common';
import { UserIdentityService } from './user-identity.service';
import { UserIdentityController } from './user-identity.controller';
import { UserProfession, UserProfessionSchema } from './user-profession.schema';
import { UserInterests, UserInterestsSchema } from './user-interests.schema';
import { UserSkills, UserSkillsSchema } from './user-skills.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from 'src/files/files.module';
import { UserIdentity, UserIdentitySchema } from './user-identity.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: UserIdentity.name, schema: UserIdentitySchema },
      { name: UserProfession.name, schema: UserProfessionSchema },
      { name: UserInterests.name, schema: UserInterestsSchema },
      { name: UserSkills.name, schema: UserSkillsSchema },
  ]),
  FilesModule,
  ],
  controllers: [UserIdentityController],
  providers: [UserIdentityService],
  exports:[
    UserIdentityService
  ]
})
export class UserIdentityModule {}
