const Reducer = (state, action) => {
  switch (action.type) {
    case 'STASH_PAGES':
      return {
        ...state,
        pages: {}
      };
    case 'SET_PAGE':
      const pages = state.pages;
      pages[action.payload.page] = action.payload.data
      return {
        ...state,
        pages
      };
    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload
      }
    default:
      return state;
  }
};

export default Reducer;