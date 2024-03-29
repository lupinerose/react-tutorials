import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  const { names, location, quantity, issue, id } = action;
  switch (action.type) {
  case c.ADD_TICKET:
    return Object.assign({}, state, {
      [id]: {
        names: names,
        location: location,
        issue: issue,
        quantity: quantity,
        id: id
      }
    });


    // return {...state, 
    //     [id]: {
    //       names: names,
    //       location: location,
    //       issue: issue,
    //       id: id
    //   }
    // };
  case c.UPDATE_TICKET_ISSUE:
    // const newStateUpdate = { ...state, [id]: { ...state[id], issue: issue } };
    const newStateUpdate = Object.assign({}, state, {
      [id]: Object.assign({}, state[id], {
        issue: issue,
      }),
    });
    return newStateUpdate;
  case c.DELETE_TICKET:
    const newState = { ...state };
    delete newState[id];
    return newState; 
  default:
    return state;
  }
};










  // case 'ADD_TICKET_TAG':
  //   const { module, topic, tagId, id } = action;

  //   const newStateUpdate = { 
  //     ...state, [id]: { ...state[id], tags: { ...state[id].tags, [tagId]: { module: module, topic: topic} } 
  //   };

  //   const newStateUpdate = Object.assign({}, state, {
  //     [id]: Object.assign({}, state[id], {
  //       tags: Object.assign({}, state[id], 
  //         [tagId] :{
  //           module: module,
  //           topic: topic
  //         }
  //       }),
  //     }),
  //   });
  // return newStateUpdate;



