export type GeoTypes = {
  lat: string;
  lng: string;
};
export type AddressTypes = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoTypes;
};
export type CompanyTypes = {
  name: string;
  catchPhrase: string;
  bs: string;
};
export type UserTypes = {
  type?: "default" | "auto" | "manual";
  format?: Map<unknown, unknown>;
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressTypes;
  phone: string;
  website: string;
  company: CompanyTypes;
  password: string;
};
