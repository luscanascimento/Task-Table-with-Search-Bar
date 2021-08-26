import { BaseModel } from '../shared/crude.service';
export interface User extends BaseModel {
  usuario: string;
  senha: string;
}
