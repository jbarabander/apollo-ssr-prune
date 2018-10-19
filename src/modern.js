import React from 'react';
import { getComponentDisplayName } from './utils';

const modern = () => {
  const DataTreeContext = React.createContext(false);

  const Provider = ({ prune, ...otherProps }) => (
    <DataTreeContext.Provider {...otherProps} value={prune}/>
  );
  Provider.defaultProps = { prune: false };
  Provider.displayName = "ApolloSsrPruneProvider";

  const ApolloSsrPrune = ({ children }) => (
    <DataTreeContext.Consumer>
        {(hideFromTree) => !hideFromTree && children}
    </DataTreeContext.Consumer>
  );
  ApolloSsrPrune.displayName = "ApolloSsrPrune";

  const ssrPrune = (Component) => {
    const NewComponent = (props) => {
      return (
        <DataTreeContext.Consumer>
          {(hideFromTree) => !hideFromTree && <Component {...props} />}
        </DataTreeContext.Consumer>
      )
    };
    NewComponent.displayName = `ApolloSsrPrune(${getComponentDisplayName(Component)})`;
    return NewComponent;
  };

  return {
    Provider,
    ApolloSsrPrune,
    ssrPrune,
  };
};

export default modern;
