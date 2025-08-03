import { useState } from "react";
import { AlternativeHeader } from "../../../../components/AlternativeHeader/AlternativeHeader";
import { ExtraCustomTabs } from "../../../../components/CustomTabWithExtraField";
import { ExpenseTable } from "./components/ExpenseTable";
import { ExpenseCategoryTable } from "./components/ExpenseCategoryTable";
import { PopupModal, Text } from "../../../../components";
import { useOutsideClick } from "../../../../hooks";
import { AddExpense } from "./components/AddExpense";
import { AddExpenseCategory } from "./components/AddExpenseCategory.component";

export const PharmacyExpense = () => {
  const [selectedTab, setSelectedTab] = useState("expense");

  const [viewModal, setViewModal] = useState(false);

  const [selectedData, setSelectedData] = useState<any | undefined>(undefined);

  const modalRef = useOutsideClick(() => setViewModal(false));

  return (
    <div className="flex flex-col">
      <AlternativeHeader
        headerTitle="Expenses"
        buttonText={
          selectedTab === "expense" ? "Add Expense" : "Add Expense Category"
        }
        button
        onSearch
        buttonAction={() => {
          setSelectedData(undefined);
          setViewModal(true);
        }}
      />

      <section className="flex flex-col bg-white gap-3">
        <ExtraCustomTabs
          tabs={[
            { label: "Expenses", value: "expense" },
            { label: "Expenses Cateogry", value: "category" },
          ]}
          defaultTab={selectedTab}
          onTabChange={(tab) => {
            setSelectedTab(tab);
            setViewModal(false);
          }}
        />
        <section>
          {selectedTab === "expense" ? (
            <ExpenseTable />
          ) : (
            <ExpenseCategoryTable
              setSelectedData={setSelectedData}
              setViewModal={setViewModal}
            />
          )}
        </section>

        {selectedTab === "expense" && viewModal && (
          <PopupModal ref={modalRef} classname="p-5  overflow-scroll">
            <div>
              <div className="flex justify-center">
                <Text
                  as="h3"
                  size="body-lg-lg"
                  variant="primary-blue"
                  className="mt-6 pb-4 text-primary"
                >
                  {selectedData ? "Edit Expense" : "Add Expense"}
                </Text>
              </div>

              <AddExpense
                editData={selectedData}
                onClose={() => setViewModal(false)}
              />
            </div>
          </PopupModal>
        )}

        {selectedTab === "category" && viewModal && (
          <PopupModal ref={modalRef} classname="p-5  overflow-scroll">
            <div>
              <div className="flex justify-center">
                <Text
                  as="h3"
                  size="body-lg-lg"
                  variant="primary-blue"
                  className="mt-6 px-2 text-primary"
                >
                  {selectedData
                    ? "Edit Expense Category"
                    : "Add Expense Category"}
                </Text>
              </div>
              <AddExpenseCategory
                editData={selectedData}
                onClose={() => setViewModal(false)}
              />
            </div>
          </PopupModal>
        )}
      </section>
    </div>
  );
};
