import { IReturnApi } from "@helpers/returnApi";
import { IUser } from "@models/Users";


declare global {
    namespace Express {

        interface Response {
            returnApi(data?: IReturnApi): Response;
        }
    }

}

