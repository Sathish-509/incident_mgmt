import { AnyAction, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import { RootState, rootReducer } from './rootReducer';
import { rootEpic } from './rootEpic';

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

const middleware = [
  ...getDefaultMiddleware({
    thunk: false, // we use redux-observable instead
  }),
  epicMiddleware,
];

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

// redux-observable
epicMiddleware.run(rootEpic);

// Hot-reloading
if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept('./rootReducer', () => {
    const { newRootReducer } = require('./rootReducer');
    store.replaceReducer(newRootReducer);
  });
}
