import { RolesEnum } from '@decorators/roles.decorator';

export interface ValidateUserOutput {
  id: string;
  email?: string;
  role?: RolesEnum;
}
