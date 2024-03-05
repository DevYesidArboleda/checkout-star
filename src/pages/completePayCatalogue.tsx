import { Layout } from "@/components/layouts/Layout";
import React from "react";
import { PayCatalog } from "@/components/cataloguePay/PayCatalogue/PayCatalog";

const completePayCatalogue = () => {
  

  return (
    <Layout>
      <div>
        <PayCatalog/>
      </div>
    </Layout>
  );
};

export default completePayCatalogue;