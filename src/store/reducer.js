const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ALL":
      return [...action.value];
    default:
      return state;
  }
};

export default reducer;
