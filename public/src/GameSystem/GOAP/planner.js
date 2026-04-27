export class GOAPPlanner {
  constructor() {}
  goal() {}
  plan(states, goal, actions) {
    let root = {
      stateList: { ...states },
      cost: 0,
      actionList: [],
      parent: null,
    };

    const leaves = [];

    if (this.buildGraph(root, leaves, actions, goal)) {
      return leaves;
    } else {
      return [];
    }
  }
  buildGraph(parent, leaves, actions, goal) {
    let found = false;
    for (const action of actions) {
      if (this.inState(action.preconditions, parent.stateList)) {
        let nextState = { ...parent.stateList, ...action.effects };
        let node = {
          stateList: { ...nextState },
          cost: parent.cost + action.cost,
          actionList: [...parent.actionList, action],
          parent: parent,
        };
        if (this.inState(goal.state, node.stateList)) {
          leaves.push(node);
          found = true;
        } else {
          let subnet = actions.filter((a) => a !== action);
          if (this.buildGraph(node, leaves, subnet, goal)) {
            found = true;
          }
        }
      }
    }
    return found;
  }
  inState(source, state) {
    for (const key in source) {
      if (source[key] !== state[key]) return false;
    }
    return true;
  }
}
