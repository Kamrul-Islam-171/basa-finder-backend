import { TRole } from "./user.interface";


export const Role: TRole[] = ['admin', 'landlord', 'tenant'];

export const USER_ROLE = {

    landlord : 'landlord',
    admin: 'admin',
    tenant: 'tenant'
} as const;

