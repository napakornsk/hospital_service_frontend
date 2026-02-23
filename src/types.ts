export interface BaseResponse<T = unknown> {
  is_error: boolean;
  message: string;
  data?: T;
}

export interface HospitalResponse {
  hospital_id: string;
  name_th: string;
  name_en: string;
}

export interface CreateStaffRequest {
  hospital_id: string;
  username: string;
  password: string;
}

export interface CreateStaffResponse {
  hospital_id: string;
  username: string;
}

export interface LoginStaffRequest {
  username: string;
  password: string;
}

export interface LoginStaffResponse {
  access_token: string;
}

export interface SearchPatientRequest {
  national_id?: string;
  passport_id?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  date_of_birth?: string;
  phone_number?: string;
  email?: string;
}

export interface PatientResponse {
  hospital_id: string;
  patient_hn: string;
  first_name_th: string;
  middle_name_th: string;
  last_name_th: string;
  first_name_en: string;
  middle_name_en: string;
  last_name_en: string;
  date_of_birth: string;
  national_id: string;
  passport_id: string;
  phone_number: string;
  email: string;
  gender: string;
}
