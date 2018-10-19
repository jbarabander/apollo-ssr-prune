import React from 'react';
import PropTypes from 'prop-types';
import { getComponentDisplayName } from './utils';

const legacy = () => {
  const contextTypes = { 
    prune: PropTypes.bool
  };

  class Provider extends React.Component {
    getChildContext() {
      return { prune: this.props.prune}
    }
    render() {
      return React.Children.only(this.props.children);
    }
  }
  Provider.childContextTypes = contextTypes;
  Provider.defaultProps = { prune: false };
  Provider.displayName = "ApolloSsrPruneProvider";

  class ApolloSsrPrune extends React.Component {
    render() {
      return !this.context.prune && React.Children.only(this.props.children);
    }
  }
  ApolloSsrPrune.contextTypes = contextTypes;
  ApolloSsrPrune.displayName = "ApolloSsrPrune";

  const ssrPrune = (Component) => {
    const NewComponent = (props) => {
      return (
        <ApolloSsrPrune>
          <Component {...props} />
        </ApolloSsrPrune>
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

export default legacy;
