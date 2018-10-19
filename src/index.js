import React from 'react';

function getComponentDisplayName(Component) {
	return Component.displayName || Component.name || 'Unknown';
}

const DataTreeContext = React.createContext(false);

const Provider = ({ prune, ...otherProps }) => (
  <DataTreeContext.Provider {...otherProps} value={prune}/>
);

Provider.displayName = "ApolloSsrPruneProvider";

export const HideFromDataTreeProvider = DataTreeContext.Provider;

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
}

export {
    Provider,
    ApolloSsrPrune,
    ssrPrune
};
