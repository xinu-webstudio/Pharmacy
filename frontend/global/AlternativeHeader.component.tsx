interface ICategoryList {
  label?: string;
  value?: string;
}
interface IDepartmentHeaderProps {
  headerTitle?: string;
  onPriority?: boolean;
  onPayrollPaymentStatus?: boolean;
  onUser?: boolean;
  onPaymentStatus?: boolean;
  onSearch?: boolean;
  onPatient?: boolean;
  onDepartment?: boolean;
  onSpecialist?: boolean;
  onAvailabilityStatus?: boolean;
  onContactNumber?: boolean;
  onDatePicker?: boolean;
  onSelect?: boolean;
  onFilter?: boolean;
  showBelow?: boolean;
  button?: boolean;
  buttonText?: string;
  onDesignation?: boolean;
  onShift?: boolean;
  onToday?: boolean;
  onRating?: boolean;
  onRole?: boolean;
  onMedicineCategory?: boolean;
  onStatus?: boolean;
  onStatusOT?: boolean;
  onAllowance?: boolean;
  onDietType?: boolean;
  onCategory?: boolean;
  onSubCategory?: boolean;
  onHospInvProductCategory?: boolean;
  onInventoryStatus?: boolean;
  onFilterExpCategory?: boolean;
  onFilterExpStatus?: boolean;
  onDatePickerExp?: boolean;
  onDateFrom?: boolean;
  buttonAction?: () => void;
  subButton?: boolean;
  subButtonAction?: () => void;
  subButtonText?: string;
  buttonIcon?: boolean;
  onSearchFunc?: (e: any) => void;
  setDate?: (value: string) => void;
  setDateFrom?: (value: string) => void;
  date?: string;
  onMainCategory?: boolean;
  dateFrom?: string;
  FilterValue?: string;
  setFilterValue?: (e: string) => void;
  mainOption?: ICategoryList[];
  onStatusToken?: boolean;
  onSubDepartment?: boolean;
  onDepartmentSelectFunc?: (e: string) => void;
  onMedicineCategorySelectFunc?: (e: string) => void;
  onSpecialistSelectFunc?: (e: string) => void;
  onAvailabilityStatusSelectFunc?: (e: string) => void;
  onPrioritySelectFunc?: (e: string) => void;
  onPayrollPaymentStatusFunc?: (e: string) => void;
  onUserFunc?: (e: string) => void;
  onPaymentStatusFunc?: (e: string) => void;
  onRoleFunc?: (e: string) => void;
  onDesignationSelectFunc?: (e: string) => void;
  setCategorySelect?: (e: string) => void;
  setPatient?: (e: string) => void;
  depOption?: any;
  setSelectDepartment?: (e: string) => void;
  patientStatusDropDown?: boolean;
  statusList?: ICategoryList[];
  setPatientStatus?: (e: any) => void;
  onHospInvProductCategorySelectFunc?: (e: string) => void;
  onHospInvStatusSelectFunc?: (e: string) => void;
  onLabStock?: boolean;
  toSearch?: string;
  onLabStockFunc?: (e: string) => void;
  onExportFunctions?: boolean;
  onExportExcel?: () => void;
  onExportPDF?: () => void;
  onPrint?: () => void;
  onReportStatus?: boolean;
  onReportStatusFunc?: (e: string) => void;
  onUserRole?: boolean;
  onUserRoleFunc?: (e: string) => void;
}

export const AlternativeHeader = ({
  onReportStatus,
  onReportStatusFunc,
  toSearch,
  onPaymentStatus,
  onPayrollPaymentStatus,
  onUser,
  onLabStock,
  onLabStockFunc,
  onPriority,
  onSearch,
  onDatePicker,
  onPatient,
  onContactNumber,
  onSelect,
  onDepartment,
  onSpecialist,
  onDateFrom,
  onAvailabilityStatus,
  onHospInvProductCategory,
  onInventoryStatus,
  onFilter,
  onShift,
  headerTitle,
  onMedicineCategory,
  onMedicineCategorySelectFunc,
  button,
  buttonText,
  onToday,
  onRating,
  onDesignation,
  subButton,
  buttonAction,
  subButtonAction,
  onFilterExpCategory,
  onFilterExpStatus,
  onDatePickerExp,
  onRole,
  onMainCategory,
  onStatus,
  onStatusOT,
  onAllowance,
  onDietType,
  onSubCategory,
  onCategory,
  subButtonText,
  onSearchFunc,
  setFilterValue,
  setDate,
  setDateFrom,
  date,
  dateFrom,
  onStatusToken,
  onDepartmentSelectFunc,
  onSpecialistSelectFunc,
  onAvailabilityStatusSelectFunc,
  onPrioritySelectFunc,
  onPaymentStatusFunc,
  onPayrollPaymentStatusFunc,
  onRoleFunc,
  mainOption,
  onDesignationSelectFunc,
  setCategorySelect,
  setPatient,
  onSubDepartment,
  depOption,
  setSelectDepartment,
  patientStatusDropDown,
  statusList,
  setPatientStatus,
  showBelow = true,
  onHospInvProductCategorySelectFunc,
  onHospInvStatusSelectFunc,
  onUserFunc,
  onExportFunctions = false,
  onExportExcel,
  onExportPDF,
  onPrint,
  onUserRole,
  onUserRoleFunc,
}: IDepartmentHeaderProps) => {
  const navigate = useNavigate();
  const { data: userData } = useGetFullUser();
  console.log(userData, 'userData');
  const usersRoles = (userData as any)?.data?.users?.map(
    (item: any) => item?.role
  );
  const uniqueRoles = [...new Set(usersRoles)];
  const usersRoleOptions = uniqueRoles
    ?.filter(
      (i) =>
        i !== 'PATIENT' && i !== 'ADMIN' && i !== 'VENDOR' && i !== 'RESELLER'
    )
    ?.map((item: any) => ({
      label: item,
      value: item,
    }));

  const { data: departmentCategory } = useGetAllDepartmentCategory();

  const { data: specialistData } = useGetAllDepartmentSubCategory();

  const { data: hospInvProductCategoryData } =
    useGetAllHospInvProductCategory();

  const specialistOptions = [
    { label: 'All Specialist', value: 'all' },
    ...((specialistData as any)?.data?.departmentSubCat?.map((item: any) => ({
      label: item?.name,
      value: item?._id,
    })) || []),
  ];

  const medicalCategoryOptions = [
    { label: 'All', value: 'all' },
    {
      label: 'Medicine',
      value: ProductCategory.DRUG,
    },
    {
      label: 'Medical-Supplies',
      value: ProductCategory.MEDICALSUPPLIES,
    },
    {
      label: 'Devices',
      value: ProductCategory.DEVICES,
    },
    {
      label: 'Beauty & skin care',
      value: ProductCategory.BEAUTIESSKINCARE,
    },
    {
      label: 'Other',
      value: ProductCategory.OTHER,
    },
  ];

  const departmentOptions = [
    { label: 'All Departments', value: 'all' },
    ...((departmentCategory as any)?.data?.departments?.map((item: any) => ({
      label: item?.name,
      value: item?._id,
    })) || []),
  ];

  const { data: userDataList } = useGetUser();
  const userOptions = [
    { label: 'Users', value: 'all' },
    { label: 'Users', value: 'all' },
    ...((userDataList as any)?.data?.users?.map((item: any) => ({
      label: get(item, 'commonInfo.personalInfo.fullName', 'N/A'),
      value: get(item, '_id', ''),
    })) || []),
  ];

  const subOptions = [
    {
      label: 'All',
      value: 'all',
    },
    ...((depOption as any)?.map((item: any) => ({
      label: item?.name,
      value: item?._id,
    })) || []),
  ];

  const hospInventoryCategoryList = [
    { label: 'Category', value: 'category' },
    ...((hospInvProductCategoryData as any)?.data?.productscategory?.map(
      (item: any) => ({
        label: item?.categoryName,
        value: item?._id,
      })
    ) || []),
  ];

  const availabilityStatusOptions = [
    { label: 'Available', value: 'AVAILABLE' },
    { label: 'Maintenance', value: 'MAINTAINANCE' }, // double-check spelling!
    { label: 'On Duty', value: 'ON-DUTY' },
  ];

  const hospInvStatusOptions = [
    { label: 'On Stock', value: 'ONSTOCK' },
    { label: 'Low Stock', value: 'LOWSTOCK' }, // double-check spelling!
    { label: 'Out of Stock', value: 'OUTOFSTOCK' },
  ];

  const roleOptions = [
    { value: 'all', label: 'Role' },
    { value: userRole.STAFF, label: 'Staff' },
    { value: userRole.VENDOR, label: 'Vendor' },
    { value: userRole.DRIVER, label: 'Driver' },
    { value: userRole.OTHER, label: 'Other' },
  ];

  const designationOptions = [
    { value: 'all', label: 'ALL' },

    { value: DESIGNATIONENUM.SENIOR, label: 'Senior' },
    {
      value: DESIGNATIONENUM.INTERMEDIATE,
      label: 'Intermediate',
    },
    { value: DESIGNATIONENUM.JUNIOR, label: 'Junior' },
    { value: DESIGNATIONENUM.INTERN, label: 'Intern' },
  ];

  // const [date, setDate] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const [dateValue, setDateValue] = useState('');

  const handleNavigate = () => {
    if (buttonAction) {
      buttonAction();
    } else {
      navigate('/add-attendance');
    }
  };

  const handleSubButton = () => {
    if (subButtonAction) {
      subButtonAction();
    } else {
      navigate('/add-attendance');
    }
  };

  return (
    <div className="flex flex-col w-full border-none ">
      <Header listTitle={headerTitle} hideHeader={true} />

      {showBelow && (
        <div className="px-2 w-full  bg-white rounded-md">
          <div className="flex w-full flex-wrap xl:flex-nowrap items-center justify-between gap-4 py-1">
            <div className="flex flex-wrap gap-4 w-full">
              {onSearch && (
                <div className="relative flex items-center w-full sm:w-[14rem] md:w-[16rem] lg:w-[16rem]">
                  <Icon
                    icon="iconoir:search"
                    width="18"
                    height="18"
                    className="absolute left-1.5"
                    style={{ color: '#676767' }}
                  />
                  <input
                    type="text"
                    placeholder={toSearch || `Search name`}
                    className="w-full py-[6px] px-2 pl-9 text-sm text-gray-500 border rounded-sm focus:outline-none focus:ring-0"
                    onChange={(e) => onSearch && onSearchFunc?.(e.target.value)}
                  />
                </div>
              )}
              {onRole && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select
                    className="w-full px-2 pl-8 py-[6px] text-sm rounded-sm text-gray-500 border  focus:outline-none focus:ring-0"
                    onChange={(e) => onRoleFunc?.(e.target.value)}
                  >
                    <option value="all">All Roles</option>
                    {roleOptions.map((item) => (
                      <option
                        key={item.value}
                        className="text-black"
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {onUserRole && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select
                    className="w-full px-2 pl-8 py-[6px] text-sm rounded-sm text-gray-500 border  focus:outline-none focus:ring-0"
                    onChange={(e) => onUserRoleFunc?.(e.target.value)}
                  >
                    <option value="all">All Roles</option>
                    {usersRoleOptions?.map((item: any) => (
                      <option
                        key={item.value}
                        className="text-black"
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {onMedicineCategory && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select
                    className="w-full px-2 pl-8 py-[6px] text-sm rounded-sm text-gray-500 border  focus:outline-none focus:ring-0"
                    onChange={(e) =>
                      onMedicineCategorySelectFunc?.(e.target.value)
                    }
                  >
                    <option selected disabled value="">
                      Medicines
                    </option>
                    {medicalCategoryOptions.map((item) => (
                      <option
                        key={item.value}
                        className="text-black"
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {onUser && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select
                    className="w-full px-2 pl-8 py-[6px] text-sm rounded-sm text-gray-500 border  focus:outline-none focus:ring-0"
                    onChange={(e) => onUserFunc?.(e.target.value)}
                  >
                    {userOptions.map((item) => (
                      <option
                        key={item.value}
                        className="text-black"
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {onCategory && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select className="w-full  py-[6px] pl-8 px-2 text-sm text-gray-500 border rounded-sm focus:outline-none focus:ring-0">
                    <option className="text-black">Categories</option>
                    <option className="text-black">Doctor</option>
                    <option className="text-black">Nurse</option>
                    <option className="text-black">Staff</option>
                  </select>
                </div>
              )}

              {onSubCategory && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select className="w-full px-2 pl-8 py-[6px] text-sm rounded-sm text-gray-500 border  focus:outline-none focus:ring-0">
                    <option className="text-black">Sub Category</option>
                    <option className="text-black">Doctor</option>
                    <option className="text-black">Nurse</option>
                    <option className="text-black">Staff</option>
                  </select>
                </div>
              )}
              {onPriority && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select
                    onChange={(e) => onPrioritySelectFunc?.(e.target.value)}
                    className="w-full px-2 py-[6px] pl-8 text-sm rounded-sm  text-gray-500 border  focus:outline-none focus:ring-0"
                  >
                    <option value={'all'} className="text-black">
                      Status
                    </option>
                    <option value={'HIGH'}>🔴 High</option>
                    <option value={'MEDIUM'}>🟡 Medium</option>
                    <option value={'LOW'}>🔵 Low</option>
                  </select>
                </div>
              )}

              {onPayrollPaymentStatus && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select
                    onChange={(e) =>
                      onPayrollPaymentStatusFunc?.(e.target.value)
                    }
                    className="w-full px-2 py-[6px] pl-8 text-sm rounded-sm  text-gray-500  focus:outline-none focus:ring-0"
                  >
                    <option value={''} className="text-black">
                      Status
                    </option>
                    <option value={'PAID'}>Paid</option>
                    <option value={'PARTIALLY-PAID'}>Partially Paid</option>
                    <option value={'PENDING'}>Pending</option>
                  </select>
                </div>
              )}

              {onPaymentStatus && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select
                    onChange={(e) => onPaymentStatusFunc?.(e.target.value)}
                    className="w-full px-2 py-[6px] text-sm pl-8 rounded-sm text-gray-500 border  focus:outline-none focus:ring-0"
                  >
                    <option value={'all'} className="text-black">
                      Status
                    </option>
                    <option value={'PAID'}>🟢 PAID</option>
                    <option value={'PARTIALLY-PAID'}>🔵 PARTIALLY PAID</option>
                    <option value={'PENDING'}>🟡 PENDING</option>
                  </select>
                </div>
              )}
              {onLabStock && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select
                    onChange={(e) => onLabStockFunc?.(e.target.value)}
                    className="w-full  py-[6px] px-2 pl-8 text-sm text-gray-500 border rounded-sm focus:outline-none focus:ring-0"
                  >
                    <option value="" selected disabled className="text-black">
                      Stock
                    </option>
                    <option value={STOCKENUM.IN_STOCK}>🟢 In Stock</option>
                    <option value={STOCKENUM.LOW_STOCK}>🟡 Low In Stock</option>
                    <option value={STOCKENUM.OUT_STOCK}>🔴 Out Of Stock</option>
                  </select>
                </div>
              )}
              {onStatus && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select className="w-full  py-[6px] px-2 pl-8 text-sm text-gray-500 border rounded-sm focus:outline-none focus:ring-0">
                    <option className="text-black">All</option>
                    <option>🟢 On Stock</option>
                    <option>🟡 Low In Stock</option>
                    <option>🔴 Out Of Stock</option>
                  </select>
                </div>
              )}
              {onReportStatus && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select
                    onChange={(e) => onReportStatusFunc?.(e.target.value)}
                    className="w-full  py-[6px] px-2 pl-8 text-sm text-gray-500 border rounded-sm focus:outline-none focus:ring-0"
                  >
                    <option className="text-black">All Report Status</option>
                    <option>Submitted</option>
                    <option>Published</option>
                  </select>
                </div>
              )}

              {onPatient && (
                <div className="relative flex items-center justify-between w-full sm:w-[13rem] md:w-[15rem] lg:w-[16rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1.5"
                    style={{ color: '#676767' }}
                  />
                  <select
                    onChange={(e: any) => {
                      setPatient?.(e.target.value);
                    }}
                    className="w-full px-2 py-[6px] text-sm pl-8 rounded-sm text-gray-500 border  focus:outline-none  pr-10 appearance-none focus:ring-0"
                  >
                    <option disabled selected value="">
                      Patient Type
                    </option>
                    <option value="all">All</option>
                    <option value="IPD">In-Patient</option>
                    <option value="OPD">Out-Patient</option>
                    <option value="EMERGENCY">Emergency</option>
                  </select>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="absolute right-3"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="m8 10.207l3.854-3.853l-.707-.708L8 8.793L4.854 5.646l-.708.708z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              {onMainCategory && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select className="w-full px-2 py-[6px] pl-8 text-sm rounded-sm text-gray-500 border  focus:outline-none focus:ring-0">
                    {mainOption?.map((option: any) => (
                      <option
                        className="text-black"
                        value={option.value}
                        key={option.value}
                        onChange={(e: any) =>
                          setCategorySelect?.(e.target.value)
                        }
                      >
                        {option.label.charAt(0).toUpperCase() +
                          option.label.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {patientStatusDropDown && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select
                    className="w-full px-2 py-[6px] pl-8 text-sm rounded-sm text-gray-500 border  focus:outline-none focus:ring-0"
                    onChange={(e: any) => {
                      setPatientStatus?.(e.target.value);
                    }}
                  >
                    {statusList?.map((option: any) => (
                      <option value={option.value}>
                        {option.label.charAt(0).toUpperCase() +
                          option.label.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {onSubDepartment && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select
                    className="w-full px-2 pl-8 py-[6px] text-sm rounded-sm text-gray-500 border  focus:outline-none  focus:ring-0"
                    onChange={(e: any) => {
                      setSelectDepartment?.(e.target.value);
                    }}
                  >
                    <option value="" disabled selected>
                      Sub Department
                    </option>
                    {subOptions?.map((option: any) => (
                      <option className="text-black" value={option.value}>
                        {option.label.charAt(0).toUpperCase() +
                          option.label.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {onDepartment && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="14"
                    height="14"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <SearchableSelect
                    options={departmentOptions || []}
                    value=""
                    onChange={(value) => onDepartmentSelectFunc?.(value)}
                    placeholder="Department"
                    className="w-full text-sm"
                  />
                </div>
              )}

              {onAvailabilityStatus && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select
                    className="w-full px-2 pl-8 py-[6px] text-sm rounded-sm text-gray-500 border  focus:outline-none focus:ring-0"
                    onChange={(e) =>
                      onAvailabilityStatusSelectFunc?.(e.target.value)
                    }
                  >
                    <option selected disabled value="">
                      Availability Status
                    </option>
                    {availabilityStatusOptions?.map((option: any) => (
                      <div className="flex flex-col gap-1" key={option.value}>
                        <option className="text-black" value={option.value}>
                          {option.label}
                        </option>
                      </div>
                    ))}
                  </select>
                </div>
              )}

              {onHospInvProductCategory && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select
                    className="w-full py-[6px] pl-8 px-2 text-sm text-gray-500 border rounded-sm focus:outline-none focus:ring-0"
                    onChange={(e) =>
                      onHospInvProductCategorySelectFunc?.(e.target.value)
                    }
                  >
                    {hospInventoryCategoryList?.map((option: any) => (
                      <div className="flex flex-col gap-1" key={option.value}>
                        <option className="text-black" value={option.value}>
                          {option.label}
                        </option>
                      </div>
                    ))}
                  </select>
                </div>
              )}
              {onInventoryStatus && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select
                    className="w-full  py-[6px] px-2 pl-8 text-sm text-gray-500 border rounded-sm focus:outline-none focus:ring-0"
                    onChange={(e) =>
                      onHospInvStatusSelectFunc?.(e.target.value)
                    }
                  >
                    {hospInvStatusOptions.map((option) => (
                      <option
                        key={option.value}
                        className="text-black"
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {onShift && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select className="w-full px-2 pl-8 py-[6px] text-sm rounded-sm text-gray-500 border  focus:outline-none focus:ring-0">
                    <option className="text-black">Shift</option>
                  </select>
                </div>
              )}

              {onDesignation && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select
                    className="w-full px-2 pl-8 py-[6px] text-sm rounded-sm text-gray-500 border focus:outline-none focus:ring-0"
                    onChange={(e) => onDesignationSelectFunc?.(e.target.value)}
                  >
                    <option selected disabled value="">
                      Designation
                    </option>
                    {designationOptions?.map((option: any) => (
                      <option
                        key={option.value}
                        className="text-black"
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {onToday && (
                <div className="relative flex items-center w-full sm:w-[18rem] md:w-[20rem] lg:w-[22rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="18"
                    height="18"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <input
                    type="text"
                    placeholder="Today"
                    className="w-full px-2 pl-8 py-[6px] text-sm rounded-sm text-gray-500 border  placeholder:text-gray-500 focus:outline-none focus:ring-0"
                  />
                </div>
              )}

              {onRating && (
                <div className="relative flex items-center w-full sm:w-[18rem] md:w-[20rem] lg:w-[22rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="18"
                    height="18"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <input
                    type="text"
                    placeholder="Rating"
                    className="w-full px-2 py-[6px] pl-8 text-sm rounded-sm text-gray-500 border  placeholder:text-gray-500 focus:outline-none focus:ring-0"
                  />
                </div>
              )}

              {onSpecialist && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select
                    className="w-full px-2 pl-8 py-[6px] text-sm rounded-sm text-gray-500 border  focus:outline-none focus:ring-0"
                    onChange={(e) => onSpecialistSelectFunc?.(e.target.value)}
                  >
                    {specialistOptions?.map((option: any) => (
                      <option
                        key={option.value}
                        className="text-black"
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {onDietType && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select className="w-full px-2 pl-8 py-[6px] text-sm rounded-sm text-gray-500 border  focus:outline-none focus:ring-0">
                    <option className="text-black">Diet Type</option>
                    <option className="text-black">Doctor</option>
                    <option className="text-black">Nurse</option>
                    <option className="text-black">Staff</option>
                  </select>
                </div>
              )}

              {onAllowance && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select className="w-full px-2 py-[6px] pl-8 text-sm rounded-sm text-gray-500 border focus:outline-none focus:ring-0">
                    <option className="text-black">Allowance</option>
                    <option className="text-black">Doctor</option>
                    <option className="text-black">Nurse</option>
                    <option className="text-black">Staff</option>
                  </select>
                </div>
              )}

              {onContactNumber && (
                <div className="relative flex items-center w-full sm:w-[13rem] md:w-[15rem] lg:w-[16rem]">
                  <Icon
                    icon="ion:call"
                    width="16"
                    height="16"
                    className="absolute left-3 text-gray-500 pointer-events-none"
                  />
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="Contact Number"
                    className="w-full py-[6px] px-2 pl-8 text-sm text-gray-500 border rounded-sm  focus:outline-none focus:ring-0"
                    onChange={(e) => onSearchFunc?.(e.target.value)}
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        'Backspace',
                        'Delete',
                        'ArrowLeft',
                        'ArrowRight',
                        'Tab',
                      ];
                      if (
                        !/^[0-9]$/.test(e.key) &&
                        !allowedKeys.includes(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                    aria-label="Search by Contact Number"
                  />
                </div>
              )}

              {onDatePicker && (
                <div className="relative flex items-center w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:calendar"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate?.(e.target.value)}
                    className="w-full py-[6px] px-2 pl-8 text-sm text-gray-500 border rounded-sm focus:outline-none focus:ring-0"
                  />
                </div>
              )}

              {onDateFrom && (
                <div className="relative flex items-center w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:calendar"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom?.(e.target.value)}
                    className="w-full py-[6px] px-2 pl-8 text-sm text-gray-500 border rounded-sm focus:outline-none focus:ring-0"
                  />
                </div>
              )}

              {onDatePickerExp && (
                <div className="relative flex items-center w-full sm:w-[16rem] md:w-[18rem] lg:w-[20rem]">
                  {/* Calendar Icon (left) */}
                  <div
                    className="absolute left-3 text-gray-400 cursor-pointer"
                    onClick={() => inputRef.current?.showPicker()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <div
                    className="absolute right-3 text-gray-400 cursor-pointer"
                    onClick={() => inputRef.current?.showPicker()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {dateValue === '' && (
                    <span className="absolute left-10 text-gray-400 pointer-events-none">
                      Payment Date
                    </span>
                  )}

                  <input
                    ref={inputRef}
                    type="date"
                    value={dateValue}
                    onChange={(e) => setDateValue(e.target.value)}
                    className={`w-full py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none 
        [&::-webkit-calendar-picker-indicator]:opacity-0
        ${dateValue === '' ? 'text-transparent' : 'text-gray-700'}`}
                  />
                </div>
              )}
              {onStatusToken && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1"
                    style={{ color: '#676767' }}
                  />
                  <select className="w-full px-2 py-[6px] pl-8 text-sm rounded-sm text-gray-500 border  focus:outline-none focus:ring-0">
                    <option className="text-black">Status</option>
                    <option>Confirmed</option>
                    <option>Canceled</option>
                    <option>Pending</option>
                  </select>
                </div>
              )}
              {onSelect && (
                <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                  <select className="w-full px-2 py-2 text-gray-500 border rounded-md focus:outline-none focus:ring-0">
                    <option className="text-black">Select</option>
                    <option className="text-black">Active</option>
                    <option className="text-black">Absent</option>
                    <option className="text-black">Present</option>
                  </select>
                </div>
              )}

              {onFilter && setFilterValue && (
                <div className="relative flex items-center justify-between w-full sm:w-[9rem] md:w-[10rem] lg:w-[12rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1.5"
                    style={{ color: '#676767' }}
                  />
                  <select
                    className="w-full py-[6px] px-2  pl-8 text-sm text-gray-500 border rounded-sm appearance-none focus:outline-none focus:ring-0"
                    onChange={(e) => setFilterValue(e.target.value)}
                    defaultValue=""
                  >
                    <option className="text-black" value="" selected disabled>
                      Status
                    </option>
                    <option className="text-black">Active</option>
                    <option className="text-black">Absent</option>
                    <option className="text-black">Present</option>
                  </select>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="absolute right-3"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="m8 10.207l3.854-3.853l-.707-.708L8 8.793L4.854 5.646l-.708.708z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              {onFilterExpCategory && (
                <div className="relative flex items-center justify-between w-full sm:w-[9rem] md:w-[10rem] lg:w-[12rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1.5"
                    style={{ color: '#676767' }}
                  />
                  <select className="w-full px-2 pl-8 py-[6px] text-sm rounded-sm  pr-10 text-gray-500 border appearance-none focus:outline-none focus:ring-0">
                    <option className="text-black" disabled selected>
                      Category
                    </option>
                    <option className="text-black" value="">
                      Office Supplies
                    </option>
                    <option className="text-black" value="">
                      Travel Reimbursement
                    </option>
                  </select>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="absolute right-3"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="m8 10.207l3.854-3.853l-.707-.708L8 8.793L4.854 5.646l-.708.708z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              {onFilterExpStatus && (
                <div className="relative flex items-center justify-between w-full sm:w-[9rem] md:w-[10rem] lg:w-[12rem]">
                  <Icon
                    icon="iconoir:filter"
                    width="16"
                    height="16"
                    className="absolute ml-1.5"
                    style={{ color: '#676767' }}
                  />
                  <select className="w-full px-2 pl-8 py-[6px] text-sm rounded-sm text-gray-500 border appearance-none focus:outline-none focus:ring-0">
                    <option hidden>status</option>
                    <option>🟢 On Stock</option>
                    <option>🟡 Low In Stock</option>
                    <option>🔴 Out Of Stock</option>
                  </select>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="absolute right-3"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="m8 10.207l3.854-3.853l-.707-.708L8 8.793L4.854 5.646l-.708.708z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex items-center  ">
              {button && (
                <div className=" w-full flex p-1">
                  <Button
                    title={buttonText}
                    onClick={handleNavigate}
                    className="shadow-lg w-full text-sm  text-nowrap"
                  />
                </div>
              )}

              {subButton && (
                <div className=" w-full p-2 flex ">
                  <Button
                    variant="outline"
                    title={subButtonText}
                    onClick={handleSubButton}
                    className="shadow-lg w-full text-sm  text-nowrap"
                  />
                </div>
              )}
              {onExportFunctions && (
                <ExportActions
                  className="flex items-center text-nowrap"
                  onExportExcel={onExportExcel}
                  onExportPDF={onExportPDF}
                  onPrint={onPrint}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
