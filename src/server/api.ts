import { config } from 'dotenv';
import { createPostgresConnection } from 'remult/postgres';
import { remultExpress } from 'remult/remult-express';
import { NotificationService } from '../app/common/notificationService';
import { Conference } from '../app/core/conference/conference';
import { Course } from '../app/core/course/course';
import { Hotel } from '../app/core/hotel/hotel';
import { Room } from '../app/core/hotel/room';
import { SignInController } from '../app/users/SignInController';
import { UpdatePasswordController } from '../app/users/UpdatePasswordController';
import { User } from '../app/users/user';

config()

export const api = remultExpress({
    entities: [User, Course, Conference, Hotel, Room],
    controllers: [SignInController, UpdatePasswordController, NotificationService],
    getUser: request => request.session!['user'],
    dataProvider: async () => {
        // if (process.env['NODE_ENV'] === "production")
        return createPostgresConnection({ configuration: "heroku" })
        // return undefined;
    }
});
