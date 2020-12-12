import MainLayout from "./MainLayout";

const getMainLayout = (page: React.ReactNode) => (
  <MainLayout>
    {page}
  </MainLayout>
)

export default getMainLayout;