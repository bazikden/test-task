export const changePosition = (array, action, elem, state, setState) => {
  const index = array.indexOf(elem);
  let secondElem;

  action === "up" ? (secondElem = index - 1) : (secondElem = index + 1);
  array[index] = array.splice(secondElem, 1, array[index])[0];
  let oldArray = state.sublist;

  if (elem.to) {
    array.forEach(elem => {
      oldArray = oldArray.filter(f => f !== elem);
    });
    oldArray = [...oldArray, ...array];
  }

  elem.to
    ? setState({ ...state, sublist: oldArray })
    : setState({ ...state, notes: array });
};

export const findAndDeleteAllChildren = (array, to) => {
  let children = [];
  findChildren(array, to);
  function findChildren(array, to) {
    if (array.length === 0) {
      return;
    }
    const elemChildren = array.filter(f => f.to === to.id);
    children = [...children, ...elemChildren];
    elemChildren.forEach(child => {
      findChildren(array, child);
    });
  }
  let filteredList = array;
  children.forEach(child => {
    filteredList = filteredList.filter(f => f.id !== child.id);
  });

  return filteredList;
};
