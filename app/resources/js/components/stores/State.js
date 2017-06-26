/**
 * Created by Jon on 6/22/17.
 */

const updateState = function (newState, context) {

    if (context === undefined) {
        throw "Context is require to use updateState";
    }

    let state = context.state;
    let keys = Object.keys(newState);
    keys.forEach(key => state[key] = newState[key]);
    context.setState(state);
};

export default updateState;