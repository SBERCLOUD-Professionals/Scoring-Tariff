import {NextPage} from "next";

export type PageFC<P> = NextPage<P> & {
  getLayout: (page: React.ReactNode) => React.ReactNode;
}
