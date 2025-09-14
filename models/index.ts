export interface Employer {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

export interface Employee {
  id: number;
  employer_id: number;
  name: string;
  ssn: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

export interface RequestLog {
  id: number;
  request_data: string;
  response_data: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}