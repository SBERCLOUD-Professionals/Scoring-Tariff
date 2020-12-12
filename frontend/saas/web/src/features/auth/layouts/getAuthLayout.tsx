import AuthLayout from "./AuthLayout";
import React from "react";

const getAuthLayout = (FooterComponent?: React.ReactComponentElement<any> | any) => (page: React.ReactNode) => (
  <AuthLayout FooterComponent={FooterComponent}>
    {page}
  </AuthLayout>
)

export default getAuthLayout;