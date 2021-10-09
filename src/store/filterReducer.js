const defaultstate = {
  location: "",
  description: "",
  general: "",
};

const filterReducer = (state = defaultstate, action) => {
  switch (action.type) {
    case "SET_FILTER":
      state.location = action.value.location;
      state.general = action.value.general;
      state.description = action.value.description;
      return state;
    default:
      return state;
  }
};

export default filterReducer;
