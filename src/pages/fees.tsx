import React from 'react';

import TransactionFeeCalculator from '../components/TransactionFeeCalculator';
import Layout from '@theme/Layout';
import FeeCalculator from "../components/fee-calculator";

export default function FeesPage(): JSX.Element {
  return (
    <Layout>
          <main className="flex min-h-screen flex-col items-center justify-center px-0 sm:px-2 md:px-4 py-8 bg-gray-50">
      <div className="w-full max-w-xl">
      <FeeCalculator />
      </div>
      </main>
    {/* <TransactionFeeCalculator /> */}
    </Layout>
  );
}