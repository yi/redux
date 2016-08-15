import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
  )

  /*
   createStore(reducer, [preloadedState], [enhancer])
   Creates a Redux store that holds the complete state tree of your app.
   There should only be a single store in your app.

   Arguments

   reducer (Function): A reducing function that returns the next state tree, given the current state tree and an action to handle.

   [preloadedState] (any): The initial state. You may optionally specify it to hydrate the state from the server in universal apps, or to restore a previously serialized user session. If you produced reducer with combineReducers, this must be a plain object with the same shape as the keys passed to it. Otherwise, you are free to pass anything that your reducer can understand.

   [enhancer] (Function): The store enhancer. You may optionally specify it to enhance the store with third-party capabilities such as middleware, time travel, persistence, etc. The only store enhancer that ships with Redux is applyMiddleware().
   */


  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
