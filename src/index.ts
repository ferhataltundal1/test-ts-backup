//@ts-ignore
import allUsers from "./user.json" assert { type: "json" };

export const controlState: ActionState = {
  userInformation: allUsers,
};

export interface UserModel {
  user_id: string;
  username: string;
  email: string;
  password: string;
  date_of_registration: string;
  user_type: UserType;
  membership_type: MembershipType;
  personel_info?: UserInfo;
  options: UserOptions;
}
export type MembershipType = "vip" | "free";
export type UserType =
  | "developer"
  | "admin"
  | "co_admin"
  | "user"
  | "not_logged";

export type UserOptions = {
  last_registration: string;
  last_ip_address: string;
  login_key: string;
  language: string;
  is_active: boolean;
};
export type UserInfo = {
  name: string;
  surname: string;
  phone_number: string;
  address: UserAddress;
};

export type UserAddress = {
  country?: string;
  city?: string;
  district?: string;
  details?: string;
};

export type ActionState = {
  userInformation: UserModel[];
};

controlState.userInformation.map((user) => {
  console.log(user);
});
