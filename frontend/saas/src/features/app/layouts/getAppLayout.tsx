import AppLayout from "./AppLayout";

const getAppLayout = (page: React.ReactNode) => (
  <AppLayout>
    {page}
  </AppLayout>
)

export default getAppLayout;