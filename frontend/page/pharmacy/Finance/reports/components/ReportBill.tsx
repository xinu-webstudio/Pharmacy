import { forwardRef } from "react";

interface ChildItem {
  title: string;
  amount: number;
  percentage: number;
  notes: string;
}

interface DetailItem {
  title: string;
  children: ChildItem[];
}

interface TableSection {
  title: string;
  id: string;
  details: DetailItem[];
}

interface propTypes {
  reportData: any;
  tableData: TableSection[];
  totalRevenue?: number;
  totalExpenses?: number;
  netIncome?: number;
  startDate?: string;
  endDate?: string;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const formatCurrency = (amount: number | string) => {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  return isNaN(numAmount) ? "0" : numAmount.toLocaleString();
};

export const formatPercentage = (percentage: number) => {
  return `${percentage.toFixed(1)}%`;
};

// Printable component that will be referenced by react-to-print
export const HospitalFinancialReport = forwardRef<HTMLDivElement, propTypes>(
  (
    {
      reportData,
      tableData,
      totalRevenue = 0,
      totalExpenses = 0,
      netIncome = 0,
      startDate,
      endDate,
    },
    ref
  ) => {
    return (
      <div ref={ref} className="bg-white">
        {/* Print Styles */}
        <style>{`
          @media print {
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            
            body {
              margin: 0;
              padding: 0;
            }
            
            .print-container {
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 20px !important;
              box-shadow: none !important;
            }
            
            .print-break {
              page-break-inside: avoid;
            }
            
            .print-break-after {
              page-break-after: always;
            }
            
            .grid {
              display: grid !important;
            }
            
            .text-sm {
              font-size: 12px !important;
            }
            
            .text-xs {
              font-size: 10px !important;
            }
            
            .p-6 {
              padding: 1.5rem !important;
            }
            
            .p-4 {
              padding: 1rem !important;
            }
            
            .p-3 {
              padding: 0.75rem !important;
            }
          }
          
          @page {
            margin: 0.5in;
            size: A4;
          }
        `}</style>

        {/* Report Container */}
        <div className="print-container max-w-6xl mx-auto bg-white shadow-lg">
          {/* Header */}
          <div className="border-b-2 border-blue-600 p-6 ">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-blue-600 mb-2">
                  Aarogya Niketan Hospital Pvt. Ltd.
                </h1>
                <p className="text-gray-600 mb-1">
                  Janakpurdham-08, Dhanusha, Nepal
                </p>
                <p className="text-gray-600 mb-1">Phone: +977-9815366625</p>
                <p className="text-gray-600">Email: sC0o6@example.com</p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  FINANCIAL REPORT
                </h2>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Report Period</p>

                  {startDate && endDate ? (
                    <p className="font-semibold text-blue-600">
                      {formatDate(startDate)} - {formatDate(endDate)}
                    </p>
                  ) : (
                    <p className="font-semibold text-blue-600">OverAll</p>
                  )}
                </div>
              </div>
            </div>

            {/* Executive Summary */}
          </div>

          {/* Financial Table */}
          <div className="p-6">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b font-medium text-gray-700">
                    <th className="w-[80px] text-center p-2">#</th>
                    <th className="text-left p-2">Category</th>
                    <th className="text-left p-2 w-[150px]">Amount (NRS)</th>
                    <th className="text-left p-2 w-[100px]">% of Total</th>
                    <th className="text-left p-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData?.map((section, sectionIndex) => (
                    <>
                      {/* Section Header */}
                      <tr
                        key={`section-${sectionIndex}`}
                        className="bg-blue-50 border-b"
                      >
                        <td className="p-1">{section.id}</td>
                        <td colSpan={4} className="p-1">
                          {section.title}
                        </td>
                      </tr>

                      {section.details.map((detail, detailIndex) => (
                        <>
                          {/* Detail Header */}
                          <tr
                            key={`detail-${sectionIndex}-${detailIndex}`}
                            className="bg-gray-50 border-b"
                          >
                            <td className="p-1">{detailIndex + 1}.</td>
                            <td className="p-1">{detail.title}</td>
                            <td colSpan={3}></td>
                          </tr>

                          {/* Child Rows */}
                          {detail.children.map((child, childIndex) => (
                            <tr
                              key={`child-${sectionIndex}-${detailIndex}-${childIndex}`}
                              className="hover:bg-gray-50 border-b"
                            >
                              <td></td>
                              <td className="p-1">{child.title}</td>
                              <td className="p-1">
                                {formatCurrency(child.amount)}
                              </td>
                              <td className="p-1">
                                {child.percentage.toFixed(1)}%
                              </td>
                              <td className="p-1">{child.notes || "-"}</td>
                            </tr>
                          ))}

                          {/* Subtotal Row */}
                          {detail.title === "Core Service" &&
                            section.title === "REVENUE" && (
                              <tr className="bg-green-50 border-b">
                                <td></td>
                                <td className="p-1">Core Services Subtotal</td>
                                <td className="p-1">
                                  {formatCurrency(
                                    detail.children.reduce(
                                      (sum, c) => sum + c.amount,
                                      0
                                    )
                                  )}
                                </td>
                                <td className="p-1">
                                  {(
                                    (detail.children.reduce(
                                      (sum, c) => sum + c.amount,
                                      0
                                    ) /
                                      totalRevenue) *
                                    100
                                  ).toFixed(1)}
                                  %
                                </td>
                                <td className="p-1">Primary revenue source</td>
                              </tr>
                            )}
                        </>
                      ))}

                      {/* Section Totals */}
                      {section.title === "REVENUE" && (
                        <tr className="bg-green-100 border-b">
                          <td></td>
                          <td className="p-1">TOTAL REVENUE</td>
                          <td className="p-1">
                            {formatCurrency(totalRevenue)}
                          </td>
                          <td className="p-1">100.0%</td>
                          <td className="p-1">9% YoY Growth</td>
                        </tr>
                      )}

                      {section.title === "OPERATING EXPENSES" && (
                        <tr className="bg-red-100 border-b">
                          <td></td>
                          <td className="p-1">TOTAL EXPENSES</td>
                          <td className="p-1">
                            {formatCurrency(totalExpenses)}
                          </td>
                          <td className="p-1">
                            {totalRevenue > 0
                              ? ((totalExpenses / totalRevenue) * 100).toFixed(
                                  1
                                )
                              : "0.0"}
                            %
                          </td>
                          <td className="p-1">Of total revenue</td>
                        </tr>
                      )}
                    </>
                  ))}

                  {/* Net Income Row */}
                  <tr className="bg-blue-100 border-b-2 border-blue-600">
                    <td></td>
                    <td className="p-1">NET INCOME</td>
                    <td
                      className={`text-left font-semibold text-md p-2 ${
                        netIncome >= 0 ? "text-green-800" : "text-red-800"
                      }`}
                    >
                      {formatCurrency(netIncome)}
                    </td>
                    <td
                      className={`text-right font-semibold p-2 ${
                        netIncome >= 0 ? "text-green-800" : "text-red-800"
                      }`}
                    >
                      {totalRevenue > 0
                        ? ((netIncome / totalRevenue) * 100).toFixed(1)
                        : "0.0"}
                      %
                    </td>
                    <td className="p-1">
                      {netIncome >= 0 ? "Profitable period" : "Loss period"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-gray-50 p-1 border-t rounded-b-lg">
            <div className="text-center space-y-1">
              <p className="text-xs text-gray-600">Total Revenue</p>
              <p className="text-sm  font-semibold">
                {formatCurrency(totalRevenue)}
              </p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-xs text-gray-600">Total Expenses</p>
              <p className="text-sm  font-semibold">
                {formatCurrency(totalExpenses)}
              </p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-xs text-gray-600">Net Income</p>
              <p
                className={`text-sm  font-semibold ${
                  netIncome >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {formatCurrency(netIncome)}
              </p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-xs text-gray-600">Profit Margin</p>
              <p
                className={`text-sm  font-semibold ${
                  netIncome >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {totalRevenue > 0
                  ? ((netIncome / totalRevenue) * 100).toFixed(1)
                  : "0.0"}
                %
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

// Export the utility function for the calling component
export const calculatePercentagesForTabData = (tabData: TableSection[]) => {
  return tabData.map((section) => {
    const updatedSection = { ...section };

    updatedSection.details = section.details.map((detail) => {
      const updatedDetail = { ...detail };

      const totalAmount = detail.children.reduce((sum, child) => {
        return sum + (child.amount || 0);
      }, 0);

      updatedDetail.children = detail.children.map((child) => {
        const updatedChild = { ...child };

        if (totalAmount > 0 && child.amount != null) {
          updatedChild.percentage = Number(
            ((child.amount / totalAmount) * 100).toFixed(1)
          );
        } else {
          updatedChild.percentage = 0;
        }

        return updatedChild;
      });

      return updatedDetail;
    });

    return updatedSection;
  });
};
