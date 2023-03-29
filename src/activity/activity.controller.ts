import { Controller, Body, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityDTO } from './dto/activity.dto';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Post()
  async create(@Body() body: ActivityDTO): Promise<any> {
    const newActivity = await this.activityService.createActivity(
      body,
      body.account,
    );
    if (newActivity) return newActivity;
  }
}
