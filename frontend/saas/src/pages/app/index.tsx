import React, {useEffect} from 'react';
import {PageFC} from "@common/pages";
import getAppLayout from "@app/layouts/getAppLayout";
import useRootData from "@common/mst/hooks/useRootData";
import {Card, Loading, Note} from "@geist-ui/react";
import {createUseStyles} from "react-jss";
import {AppTheme} from "@common/theme";
import {ITariffFeatureModel, ITariffModel} from "@common/mst/stores/api/tariff/tariff.model";
import {observer} from 'mobx-react';

const useStyles = createUseStyles((theme: AppTheme) => ({
  root: {
    ...theme.layout.templates.flexRow(),
    ...theme.layout.templates.flexGrow(),
  },
  card: {
    padding: 8,
    margin: 4
  },
  featureContainer: {
    ...theme.layout.templates.flexColumn()
  },
  feature: {
    margin: "4px 4px !important"
  }
}));

interface Props {
}

interface TariffProps {
  tariff: ITariffModel;
}

interface TariffFeatureProps {
  tariffFeature: ITariffFeatureModel;
}

const TariffFeature: React.FC<TariffFeatureProps> = ({tariffFeature}) => {
  const classes = useStyles();
  return (
    <Note label={tariffFeature.feature.name} className={classes.feature}>Кол-во {tariffFeature.count.toString()}</Note>
  )
};

const Tariff: React.FC<TariffProps> = ({tariff}) => {
  const classes = useStyles();
  return (
    <div  className={classes.card}>
      <Card width="330px" type={"success"}>
        <h4>{tariff.name}</h4>
        <Card.Footer>
          <div className={classes.featureContainer}>
            {tariff.tariffFeatures.map(tariffFeature => (
              <TariffFeature key={tariffFeature.id} tariffFeature={tariffFeature}/>
            ))}
          </div>
        </Card.Footer>
      </Card>
    </div>
  )
};

const App: PageFC<Props> = ({children}) => {

  const classes = useStyles();
  const {fetchItems, items, state} = useRootData(store => ({
    fetchItems: store.api.tariffStore.fetchItems,
    items: store.api.tariffStore.items,
    state: store.api.tariffStore.fetchState,
  }));

  useEffect(() => {
    fetchItems().then();
  }, []);

  if (state.loading) return <Loading>Загрузка тарифов</Loading>

  return (
    <div className={classes.root}>
      {items.map(item => (
        <Tariff key={item.id} tariff={item}/>
      ))}
    </div>
  );
};

App.getLayout = getAppLayout;

export default observer(App);