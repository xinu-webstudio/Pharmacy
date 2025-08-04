import { useState } from 'react';
import { AlternativeHeader } from '../../../global/AlternativeHeader.component';
import { ExtraCustomTabs } from '../../../global/CustomTabWithExtraField.component';
import { SalesTable } from './components/Sales.component';
import { SaleReturnTable } from './components/Sale-Return-Table.component';

export const SalesPage = () => {
  const [selectedTab, setSelectedTab] = useState('sales');

  return (
    <div className="flex flex-col">
      <AlternativeHeader headerTitle="Total Sales" onSearch />

      <section className="flex flex-col bg-white gap-3">
        <ExtraCustomTabs
          tabs={[
            { label: 'Sales', value: 'sales' },
            { label: 'Sales Return', value: 'salesReturn' },
          ]}
          defaultTab={selectedTab}
          onTabChange={(tab) => {
            setSelectedTab(tab);
          }}
        />
        <section>
          {selectedTab === 'sales' ? <SalesTable /> : <SaleReturnTable />}
        </section>
      </section>
    </div>
  );
};
