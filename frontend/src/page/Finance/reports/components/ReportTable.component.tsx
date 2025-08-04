import { useEffect, useRef, useState } from 'react';
// import { useGetAnalytics } from '../../../../../server-action/api/analytics.api';
import {
  calculatePercentagesForTabData,
  formatCurrency,
  formatPercentage,
  HospitalFinancialReport,
} from './ReportBill';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useReactToPrint } from 'react-to-print';
import { buildQueryParams } from '../../../../hooks/useBuildQuery.hooks';

type ChildItem = {
  title: string;
  amount: number;
  percentage: number;
  notes: string;
};

type DetailItem = {
  title: string;
  children: ChildItem[];
};

export type TableSection = {
  title: string;
  id: string;
  details: DetailItem[];
};

interface propTypes {
  dateFrom: string;
  dateTo: string;
}

export const ReportTable = ({ dateFrom, dateTo }: propTypes) => {
  const queryParams = buildQueryParams({
    startDate: dateFrom,
    endDate: dateTo,
  });

  // const { data: analyticsData } = useGetAnalytics(queryParams);
  // const analytics = (analyticsData as any)?.data;

  const [tableData, setTableData] = useState<TableSection[]>([]);

  // useEffect(() => {
  //   if (!analytics) return;

  //   const rawTabData: TableSection[] = [
  //     {
  //       title: 'REVENUE',
  //       id: 'A.',
  //       details: [
  //         {
  //           title: 'Core Service',
  //           children: [
  //             {
  //               title: 'OPD Consultations',
  //               amount:
  //                 analytics?.coreServices?.opdConsultation?.totalAmount || 0,
  //               percentage: 0, // Will be calculated
  //               notes: `${
  //                 analytics?.coreServices?.opdConsultation?.appointmentCount ||
  //                 0
  //               } patients/day`,
  //             },
  //             {
  //               title: 'IPD Admissions',
  //               amount:
  //                 analytics?.coreServices?.IPDAdmission?.totalCharges || 0,
  //               percentage: 0, // Will be calculated
  //               notes: `${
  //                 analytics?.coreServices?.IPDAdmission?.totalBedAssigned || 0
  //               } beds/day`,
  //             },
  //           ],
  //         },
  //         {
  //           title: 'Ancillary Services',
  //           children: [
  //             {
  //               title: 'Laboratory Tests',
  //               amount:
  //                 analytics?.coreServices?.laboratory?.totalLaboratoryInvoice ||
  //                 0,
  //               percentage: 0, // Will be calculated
  //               notes: `${
  //                 analytics?.coreServices?.laboratory?.labInvoiceCount || 0
  //               } tests/day`,
  //             },
  //             {
  //               title: 'Pharmacy Sales',
  //               amount:
  //                 analytics?.coreServices?.pharmacy?.totalPharmacyInvoice || 0,
  //               percentage: 0, // Will be calculated
  //               notes: `${
  //                 analytics?.coreServices?.pharmacy
  //                   ?.totalPharmacyInvoiceCount || 0
  //               } invoice/day`,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       title: 'OPERATING EXPENSES',
  //       id: 'B.',
  //       details: [
  //         {
  //           title: 'Direct Costs',
  //           children: [
  //             {
  //               title: 'Staff Salary',
  //               amount: 12500000,
  //               percentage: 0, // Will be calculated
  //               notes: 'Notes',
  //             },
  //             {
  //               title: 'Medical Supplies',
  //               amount: 18200000,
  //               percentage: 0, // Will be calculated
  //               notes: 'Notes',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       title: 'Hospital Overall Invoice',
  //       id: 'C.',
  //       details: [
  //         {
  //           title: 'Invoices',
  //           children: [
  //             {
  //               title: 'Paid invoice',
  //               amount:
  //                 analytics?.coreServices?.invoices?.paidInvoiceTotal || 0,
  //               percentage: 0, // Will be calculated
  //               notes: `${
  //                 analytics?.coreServices?.invoices?.paidInvoiceCount || 0
  //               }/day`,
  //             },
  //             {
  //               title: 'Pending invoice',
  //               amount:
  //                 analytics?.coreServices?.invoices?.pendingInvoiceTotal || 0,
  //               percentage: 0, // Will be calculated
  //               notes: `${
  //                 analytics?.coreServices?.invoices?.pendingInvoiceCount || 0
  //               }/day`,
  //             },
  //             {
  //               title: 'Total invoice',
  //               amount: analytics?.coreServices?.invoices?.allInvoiceTotal || 0,
  //               percentage: 0, // Will be calculated
  //               notes: '-',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ];

  //   // Calculate percentages - choose one of these methods:

  //   // Method 1: Calculate percentages within each detail group (Core Service, Ancillary Services, etc.)
  //   const tabDataWithPercentages = calculatePercentagesForTabData(rawTabData);

  //   // Method 2: Calculate percentages within each main section (REVENUE, OPERATING EXPENSES, etc.)
  //   // const tabDataWithPercentages = calculatePercentagesForEntireSection(rawTabData);

  //   setTableData(tabDataWithPercentages);
  // }, [analytics]);

  // Calculate total revenue
  const totalRevenue =
    tableData[0]?.details.reduce((total, detail) => {
      return (
        total +
        detail.children.reduce((sum, child) => sum + (child.amount || 0), 0)
      );
    }, 0) || 0;

  const totalExpenses =
    tableData[1]?.details.reduce((total, detail) => {
      return (
        total +
        detail.children.reduce((sum, child) => sum + (child.amount || 0), 0)
      );
    }, 0) || 0;

  const contentRef = useRef<HTMLDivElement | null | any>(null);

  const handlePrint = useReactToPrint({
    contentRef,
  });

  return (
    <div className="flex flex-col p-6 gap-6 bg-white">
      <div className="flex justify-between">
        <section className="flex flex-col">
          <p className="font-semibold text-[#464646] text-xl">
            Profit & Loss Statement
          </p>
          <p className="font-semibold text-base text-[#464646]">
            {`Fiscal Year: 2024 (Jan 1- Dec 31)`}{' '}
          </p>
        </section>

        <section className="flex place-items-center gap-3">
          <button
            className="flex bg-[#146C71] place-items-center px-3 py-2 gap-2 text-white rounded-lg"
            onClick={handlePrint}
          >
            <p>Print</p>
            <Icon icon="mingcute:print-line" />
          </button>
        </section>
      </div>
      {/* Table Header */}
      <div className="grid grid-cols-[80px_1fr_200px_120px_1fr] bg-gray-50 p-4 border-b font-medium text-gray-600">
        <div>#</div>
        <div>Category</div>
        <div className="text-right">Amount (NPR)</div>
        <div className="text-right">% of Total</div>
        <div className="pl-8">Notes</div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col">
        {tableData?.map((section, sectionIndex) => (
          <div key={`section-${sectionIndex}`} className="flex flex-col">
            {/* Section Header */}
            <div className="grid grid-cols-[80px_1fr_200px_120px_1fr] p-4 border-b bg-white">
              <div className="font-medium text-teal-600">{section.id}</div>
              <div className="font-medium text-teal-600">{section.title}</div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            {/* Section Details */}
            {section?.details?.map((detail, detailIndex) => (
              <div
                key={`detail-${sectionIndex}-${detailIndex}`}
                className="flex flex-col"
              >
                {/* Detail Header */}
                <div className="grid grid-cols-[80px_1fr_200px_120px_1fr] p-4 border-b bg-white">
                  <div className="font-medium">{detailIndex + 1}.</div>
                  <div className="font-medium">{detail.title}</div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>

                {/* Detail Children */}
                {detail?.children?.map((child, childIndex) => (
                  <div
                    key={`child-${sectionIndex}-${detailIndex}-${childIndex}`}
                    className="grid grid-cols-[80px_1fr_200px_120px_1fr] p-4 border-b bg-white"
                  >
                    <div></div>
                    <div className="pl-4">{child.title}</div>
                    <div className="text-right">
                      {formatCurrency(child.amount)}
                    </div>
                    <div className="text-right">
                      {formatPercentage(child.percentage)}
                    </div>
                    <div className="pl-8">{child.notes}</div>
                  </div>
                ))}
              </div>
            ))}

            {/* Total Row (only for Revenue section) */}
            {section.title === 'REVENUE' && (
              <div className="grid grid-cols-[80px_1fr_200px_120px_1fr] p-4 border-b bg-white font-medium">
                <div></div>
                <div>Total Revenue</div>
                <div className="text-right">{formatCurrency(totalRevenue)}</div>
                <div className="text-right">100%</div>
                <div className="pl-8">9% YoY</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'none' }}>
        <HospitalFinancialReport
          ref={contentRef}
          // reportData={analytics}
          tableData={tableData}
          totalRevenue={totalRevenue}
          totalExpenses={totalExpenses}
          netIncome={totalRevenue - totalExpenses}
          endDate={dateTo}
          startDate={dateFrom}
        />
      </div>
    </div>
  );
};
