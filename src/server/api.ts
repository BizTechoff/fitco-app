import { createPostgresConnection } from 'remult/postgres';
import { remultExpress } from 'remult/remult-express';
import { NotificationService } from '../app/common/notificationService';
import { SignInController } from '../app/users/SignInController';
import { UpdatePasswordController } from '../app/users/UpdatePasswordController';
import { User } from '../app/users/user';


export const api = remultExpress({
    entities: [User],
    controllers: [SignInController, UpdatePasswordController, NotificationService],
    getUser: request => request.session!['user'],
    dataProvider: async () => {
        if (process.env['NODE_ENV'] === "production")
            return createPostgresConnection({ configuration: "heroku" })
        return undefined;
    }
});
