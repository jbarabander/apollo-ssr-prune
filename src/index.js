import React from 'react';
import modern from './modern';
import legacy from './legacy';

let Provider;
let ApolloSsrPrune;
let ssrPrune;

if (React.createContext) {
  const api = modern();
  Provider = api.Provider;
  ApolloSsrPrune = api.ApolloSsrPrune;
  ssrPrune = api.ssrPrune;
} else {
  const api = legacy();
  Provider = api.Provider;
  ApolloSsrPrune = api.ApolloSsrPrune;
  ssrPrune = api.ssrPrune;
}

export {
    Provider,
    ApolloSsrPrune,
    ssrPrune
};
