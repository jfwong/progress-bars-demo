function arrayUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "RESET":
      return { ...state, bars: state.defaultBars, changed: false };

    case "SET_INITIAL":
      return {
        ...state,
        ...payload,
        buttons: payload.buttons.filter(arrayUnique).sort((a, b) => a - b),
        activeBar: 0
      };

    case "CHANGE_BAR":
      return { ...state, activeBar: payload.index };

    case "UPDATE_PROGRESS":
      const { activeBar, bars } = state;
      let temp = [...bars];
      temp[activeBar] += payload.value;

      if (temp[activeBar] < 0) {
        temp[activeBar] = 0;
      }

      return { ...state, bars: temp, changed: true };

    default:
      return { ...state };
  }
};

export default reducer;
