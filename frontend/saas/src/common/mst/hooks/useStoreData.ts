import React from "react";

const useStoreData = <Selection, ContextData, Store>(
  context: React.Context<ContextData>,
  storeSelector: (contextData: ContextData) => Store,
  dataSelector: (store: Store) => Selection
) => {
  const value = React.useContext(context);
  if (!value) {
    throw new Error('React context of RootStore does not exits!');
  }
  const store = storeSelector(value);
  return dataSelector(store);
};

export default useStoreData;