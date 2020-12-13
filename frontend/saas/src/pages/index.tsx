import {APP_HOME_ROUTE} from "@common/routes";
import {routerUtils} from "@common/utils/router.utils";
import {NextPageContext} from "next";

interface Props {
}

const Index: React.FC<Props> = (props) => {
  return null;
};

(Index as any).getInitialProps = async (ctx: NextPageContext) => {
  await routerUtils.redirect(APP_HOME_ROUTE, undefined, ctx);
  return {};
}

export default Index;