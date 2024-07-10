const productPageReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_REQUEST":
      return { ...state, error: "", loading: true };
    case "GET_SUCCESS":
      return { ...state, product: payload, loading: false };
    case "GET_FAILURE":
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

export default productPageReducer;
