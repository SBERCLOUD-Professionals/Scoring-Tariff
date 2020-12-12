import {IRootStore, RootStoreContext} from "@common/mst";
import useStoreData from "@common/mst/hooks/useStoreData";

const useRootData = <Selection,>(dataSelector: (store: IRootStore) => Selection) =>
  useStoreData(RootStoreContext, (contextData) => contextData!, dataSelector);

export default useRootData;