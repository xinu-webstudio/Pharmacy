import { userRole } from '../../constants/constants';
// import { TDepartment } from '../api/departmentApi';
// import { TDepartment as SecondDepartment } from '../api/department-category.api';

// import { IServiceType } from '../api/reseller.api';

export interface ICommonInfo {
  generalDescription?: string;
  ipdOpd?: string;
  emergency?: boolean;
  personalInfo?: {
    fullName?: string;
    religion?: string;
    dob?: string;
    nationality?: string;
    bloodGroup?: string;
    gender?: string;
    language?: string;
    maritalStatus?: string;
  };
  contactInfo?: {
    phone?: {
      primaryPhone?: string;
      secondaryPhone?: string;
    };
    address?: {
      currentAddress?: string;
      permanentAddress?: string;
    };
  };
}

export interface IDocument {
  documentType?: string;
  documentNumber?: string;
  documentImages?: string[];
}

export interface IIdentityInfo {
  primaryIdNo?: string;
  profileImage?: string;
  identityDocuments?: IDocument[];
}

export interface IEducationList {
  qualification?: string;
  qualificationInstitution?: string;
  startDate?: string | Date;
  qualifiedDate?: string | Date;
  fieldOfStudy?: string;
  lisenceNo?: string;
  documentImages?: string[];
}

export interface IShiftList {
  shift: string; //TODO
}

export interface IProfessionalInfo {
  checkInStatus?: boolean;
  designation?: string;
  consultationFee?: number;
  speciality?: string;
  employeeType?: string;
  shifts?: IShiftList[];
  education?: IEducationList[];
  qualificationCertificate?: IDocument[];
}

export interface IExperienceList {
  hospitalName?: string;
  jobTitle?: string;
  jobType?: string;
  tenureStartDate?: string;
  tenureEndDate?: string;
}

export interface IExperienceInfo {
  yearOfExperience?: string;
  joinedDate?: string;
  experience?: IExperienceList[];
}

export interface IDepartmentList {
  department?: string; //TODO
  speciality?: string; //TODO
}

// export interface IDepartment {
//   hirachyFirst?: TDepartment; //TODO
//   hirachyFirstHOD?: boolean;
//   department?: TDepartment; //TODO;
//   departmentHOD?: boolean;
//   speciality?: TDepartment; //TODO
//   specialityHOD?: boolean;
// }
export interface IRoomAssignment {
  categoryName?: string; //TODO
  room?: string; //TODO
  bedNumber?: number;
  reason?: string;
}

export interface IBankInfo {
  bankName?: string;
  branchName?: string;
  accountNumber?: string;
  accountHolderName?: string;
  IFSCCode?: string;
}

export interface IFinancialInfo {
  salary?: number;
  pan?: string;
  accountDetails?: IBankInfo;
}

export interface IInsuranceList {
  insuranceCompany?: string;
  insurancePolicyNo?: string;
  insurancePolicyType?: string;
  insurancePolicyStartDate?: string;
  insurancePolicyEndDate?: string;
  insurancePolicyDocuments?: IDocument[];
}

export interface IReviewList {
  reviewerName?: string;
  reviewerDesignation?: string;
  reviewerInstitution?: string;
  reviewerRating?: number;
  reviewerComment?: string;
  reviewerDate?: string;
  reviewerEmail?: string;
}

export interface IMedicalHistory {
  diseaseName?: string;
  diseaseStartDate?: string;
  diseaseEndDate?: string;
  diseaseMedication?: string;
  diseaseMedicationStartDate?: string;
  diseaseMedicationEndDate?: string;
  diseaseMedicationImages?: string[];
}

export interface IMedicalInfo {
  age?: number;
  height?: string;
  weight?: number;
  bloodGroup?: string;
  medicalHistory?: IMedicalHistory[];
}
export interface IPatientInfo {
  patientId?: string;
  dateOfVisit?: string;
  reasonForRevisit?: string;
  patientStatus?: string;
}

export interface IAppointment {
  department?: string; //TODO
  specialist?: string; //TODO
  token?: string; //TODO
  user: string; //TODO
  date: string;
  timeSlot: string;
  totalCharge?: number;
  tax?: number;
  discount?: number;
  payableAmount?: number;
  paymentMethod: string;
  paymentStatus: string;
  transactionNo: string;
  doctor: string; //TODO
  serviceList: [string];
  treatment: string; //TODO
  bank: string; //TODO
  status: string;
  remark: string;
}

export interface IVendorInfo {
  vendorId?: string;
  contactPerson?: string;
  category?: string[];
  organizationName?: string;
  lisenceNo?: string;
  organizationContact?: string;
  organizationPAN?: string;
  billingCycle?: number;
  creditLimit?: number;
}
export interface IResellerInfo {
  resellerId?: string;
  ipdOpd?: string[];
  //   department?: SecondDepartment[];
  paymentDischarge?: string;
  paymentType?: string;
  paymentRate?: number;
  accountDetails?: IBankInfo;
}
export interface ITransferInformation {
  transferedBy?: IUser;
  transferedHospital?: string;
  date?: string;
}
export interface ISurgicalTimeFrames {
  timeFrame?: string;
  avaibilityStatus?: boolean;
}
export interface ISurgicalDetailsInfo {
  schedules?: ISurgicalTimeFrames[];
  date?: string;
}

export interface IUser {
  email: string;
  password?: string;
  role: (typeof userRole)[keyof typeof userRole];
  FCMToken?: string;
  commonInfo?: ICommonInfo;
  identityInformation?: IIdentityInfo;
  professionalDetails?: IProfessionalInfo;
  experienceDetails?: IExperienceInfo;
  //   departmentDetails?: IDepartment;
  financialInfo?: IFinancialInfo;
  insuranceInfo?: IInsuranceList;
  reviews?: IReviewList[];
  medicalInfo?: IMedicalInfo;
  patientInfo?: IPatientInfo;
  emergencyInfo?: IRoomAssignment;
  appointInfo?: IAppointment;
  vendorInfo?: IVendorInfo;
  resellerInfo?: IResellerInfo;
  transferInformations?: ITransferInformation;
  surgeryDetails?: ISurgicalDetailsInfo[];
  //   serviceList?: IServiceType[];

  _id: string;
  isActive?: boolean;
  isSuperAdmin?: boolean;
  isArchived?: boolean;
  loginAttempts?: number;
  lockUntil?: number;
  passwordChangedAt?: Date;
  emailChangedAt?: Date;

  createdAt?: Date;
  modifiedAt?: Date;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
  resetPasswordToken?: String;
  resetPasswordTokenExpiresAt?: Date;
}
