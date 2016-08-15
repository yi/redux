import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from '../components/Counter'
import * as CounterActions from '../actions'

function mapStateToProps(state) {
  return {
    counter: state.counter
  }

  /*
   [mapStateToProps(state, [ownProps]): stateProps] (Function):
   If specified, the component will subscribe to Redux store updates. Any time it updates, mapStateToProps will be called. Its result must be a plain object*,
   and it will be merged into the component’s props. If you omit it, the component will not be subscribed to the Redux store.
   If ownProps is specified as a second argument, its value will be the props passed to your component, and mapStateToProps will be additionally re-invoked whenever
   the component receives new props (e.g. if props received from a parent component have shallowly changed, and you use the ownProps argument, mapStateToProps is re-evaluated).
   * */
}

function mapDispatchToProps(dispatch) {
  /*
  [mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function): If an object is passed, each function inside it will be assumed to be a Redux action creator. An object with the same function names, but with every action creator wrapped into a dispatch call so they may be invoked directly, will be merged into the component’s props. If a function is passed, it will be given dispatch. It’s up to you to return an object that somehow uses dispatch to bind action creators in your own way. (Tip: you may use the bindActionCreators() helper from Redux.) If you omit it, the default implementation just injects dispatch into your component’s props. If ownProps is specified as a second argument, its value will be the props passed to your component, and mapDispatchToProps will be re-invoked whenever the component receives new props.
   */

  return bindActionCreators(CounterActions, dispatch)

    /*
  bindActionCreators(actionCreators, dispatch)
  Turns an object whose values are action creators, into an object with the same keys, but with every action creator wrapped into a dispatch call so they may be invoked directly.

    Normally you should just call dispatch directly on your Store instance. If you use Redux with React, react-redux will provide you with the dispatch function so you can call it directly, too.

    The only use case for bindActionCreators is when you want to pass some action creators down to a component that isn’t aware of Redux, and you don’t want to pass dispatch or the Redux store to it.

    For convenience, you can also pass a single function as the first argument, and get a function in return.

    Parameters

  actionCreators (Function or Object): An action creator, or an object whose values are action creators.

    dispatch (Function): A dispatch function available on the Store instance.
    */


}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)

/*
Connects a React component to a Redux store.

It does not modify the component class passed to it.
Instead, it returns a new, connected component class, for you to use.
*/
