
import { AccountTypeEnum } from "@/enums/accountType.enum";

export interface IAccount {
    firstName: string;
    lastName: string;
    position?: string | null;
    department?: string | null;
    email: string;
    type: AccountTypeEnum;
    password: string;
    deletedAt?: string | null;
}