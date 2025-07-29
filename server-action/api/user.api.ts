import { DB } from '../../constants/constants';
import { createApiConfig } from '../config/Api-config';
import { IUser } from '../types/user.types';

const userApi = createApiConfig<IUser>(DB.USER, 'user', [
  'user',
  'patient-history',
]);

const doctorPatientApi = createApiConfig('doctor-patients', 'doctor-patient');

// Export the hooks with the specific names you want
export const useGetUser = userApi.useGetAll;
export const useGetUserById = userApi.useGetById;
export const useUpdateUser: any = userApi.useUpdate;
export const useDeleteUser = userApi.useDeleteByQuery;
export const useDeleteUserWithQuery = userApi.useDeleteWithQuery;

const changepassword = createApiConfig('change-password', 'change-password');
export const useChangePassword = changepassword.useCreate;

export const useGetDoctorPatients = doctorPatientApi.useGetAll;
