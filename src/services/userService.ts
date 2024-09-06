import create from "./httpService";

export interface User {
  id: number;
  name: string;
  userName: string;
  email: string;
}

export default create("/users");
