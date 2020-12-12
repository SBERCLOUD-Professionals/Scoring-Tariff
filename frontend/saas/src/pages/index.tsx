import {Page} from "@geist-ui/react";
import Footer from "@home/containers/Footer";
import Main from "@home/containers/Main";

interface Props {
}

const Index: React.FC<Props> = (props) => {

  return (
    <Page size="small" className={"page"}>
      <Page.Header>
        <h2>Header</h2>
      </Page.Header>
      <Page.Content className={"page_content"}>
        <Main/>
      </Page.Content>
      <Page.Footer>
        <Footer/>
      </Page.Footer>
    </Page>
  );
};

export default Index;