import { ReactElement } from "react";
import {
  FollowUpPatientIcon,
  GeneralRevenueIcon,
  NewPatientIcon,
  PatientServeIcon,
} from "../../assets/Svg/Svg";
import Header from "../Header";

interface IDepartmentHeaderProps {
  title?: string;
  totalAdmissions?: string | number;
  totalSurgeries?: string | number;
  patientInRecovery?: string | number;
  currentPatients?: string | number;
  dischargedBabies?: string | number;
  discharged?: string | number;
  criticalCases?: string | number;
  totalPatients?: string | number;
  highRiskCases?: string | number;
  bedAvailability?: string | number;
  underObservation?: string | number;
  dischargedPatients?: string | number;
  headerTitle: string;
  doctorName?: string;
  services?: string[] | undefined;
  patientServed?: string | number;
  newPatient?: string | number;
  followUpPatient?: string | number;
  revenueGenerated?: string | number;
  icon?: ReactElement;
  doctorImage?: ReactElement;
}

const colors = [
  "text-[#28ABE8]",
  "text-[#6A49E6]",
  "text-[#3D42DF]",
  "text-[#4AD991]",
  "text-[#15B7ED]",
  "text-[#ED4242]",
];

export const DepartmentHeader = ({
  doctorName,
  followUpPatient,
  newPatient,
  patientServed,
  revenueGenerated,
  services,
  headerTitle,
  title,
  doctorImage,
  icon,
  totalAdmissions,
  totalSurgeries,
  patientInRecovery,
  currentPatients,
  dischargedBabies,
  discharged,
  criticalCases,
  totalPatients,
  highRiskCases,
  bedAvailability,
  underObservation,
  dischargedPatients,
}: IDepartmentHeaderProps) => {
  return (
    <div className="w-full pt-3 pb-3 border-none shadow-sm">
      <Header listTitle={headerTitle} hideHeader={true} />

      <div className="bg-white rounded-lg">
        <div className="flex items-center justify-between px-3 pt-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
              {icon}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{title}</h2>
              <div className="flex gap-2 mt-1">
                {services?.map((service, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs font-medium bg-gray-200 ${colors[index]} rounded-md`}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-lg font-semibold">{doctorName}</p>
              <p className="text-sm text-gray-500">Head of Department</p>
            </div>
            {/* <img src={doctorImage} alt={doctorName} className="object-cover w-12 h-12 rounded-full" /> */}
            {doctorImage}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 p-6">
          {patientServed && (
            <StatCard
              title="Patients Served"
              value={patientServed}
              icon={<PatientServeIcon />}
            />
          )}
          {revenueGenerated && (
            <StatCard
              title="Revenue Generated"
              value={`Rs.${revenueGenerated}`}
              icon={<GeneralRevenueIcon />}
            />
          )}
          {newPatient && (
            <StatCard
              title="New Patients"
              value={newPatient}
              icon={<NewPatientIcon />}
            />
          )}
          {followUpPatient && (
            <StatCard
              title="Follow-up Patients"
              value={followUpPatient}
              icon={<FollowUpPatientIcon />}
            />
          )}
          {totalAdmissions && (
            <StatCard
              title="Total Admissions"
              value={totalAdmissions}
              icon={<PatientServeIcon />}
            />
          )}
          {totalSurgeries && (
            <StatCard
              title="Total Surgeries"
              value={totalSurgeries}
              icon={<PatientServeIcon />}
            />
          )}
          {patientInRecovery && (
            <StatCard
              title="Patient in Recovery"
              value={patientInRecovery}
              icon={<NewPatientIcon />}
            />
          )}
          {totalPatients && (
            <StatCard
              title="Total Patients"
              value={totalPatients}
              icon={<PatientServeIcon />}
            />
          )}
          {currentPatients && (
            <StatCard
              title="Current Patients"
              value={currentPatients}
              icon={<NewPatientIcon />}
            />
          )}
          {dischargedBabies && (
            <StatCard
              title="Discharged Babies"
              value={dischargedBabies}
              icon={<FollowUpPatientIcon />}
            />
          )}
          {discharged && (
            <StatCard
              title="Discharged"
              value={discharged}
              icon={<FollowUpPatientIcon />}
            />
          )}
          {criticalCases && (
            <StatCard
              title="Critical Cases"
              value={criticalCases}
              icon={<GeneralRevenueIcon />}
            />
          )}
          {highRiskCases && (
            <StatCard
              title="High-Risk Cases"
              value={highRiskCases}
              icon={<FollowUpPatientIcon />}
            />
          )}
          {underObservation && (
            <StatCard
              title="Under Observation"
              value={underObservation}
              icon={<NewPatientIcon />}
            />
          )}
          {bedAvailability && (
            <StatCard
              title="Bed Availability"
              value={bedAvailability}
              icon={<FollowUpPatientIcon />}
            />
          )}
          {dischargedPatients && (
            <StatCard
              title="Discharged Patients"
              value={dischargedPatients}
              icon={<GeneralRevenueIcon />}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number | undefined;
  icon: ReactElement;
}) => (
  <div className="p-4 bg-[#f6f8f9] shadow-sm">
    <div className="flex justify-between">
      <div className="flex flex-col gap-2">
        <p className="mt-1 text-sm text-gray-600">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
      <span className="text-2xl">{icon}</span>
    </div>
  </div>
);
