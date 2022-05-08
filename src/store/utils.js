
export const getErrorMessage = (err) => {
  return err.message;
};

export const initEntityState = (initialValue, loading = false) => ({
    loading,
    data: initialValue,
    loadFailed: false,
    error: null,
    canceler: null
  });
  
  export const entityLoadingStarted = (state, canceler) => ({
    ...state,
    canceler,
    loading: true,
    error: null,
    loadFailed: false
  });
  
  export const entityLoadingSucceeded = (state, data) => ({
    ...state,
    data,
    loading: false,
    loadFailed: false,
    error: null,
    canceler: null
  });
  
  export const entityLoadingFailed = (state, error) => ({
    ...state,
    loading: false,
    loadFailed: true,
    error,
    canceler: null
  });

  export const handleSelection = (selectedIds, selectId, singleSelect = false) => {

    const selected = new Set(selectedIds || []);
    
    if(singleSelect) return new Set([selectId]);

    if (selected.has(selectId)) {
      selected.delete(selectId);
    } else {
      selected.add(selectId);
    }
  
    return selected;
  };

  export const shuffleArray = (array) => {
    let shuffeled = array;

    for (let i = shuffeled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffeled[i], shuffeled[j]] = [shuffeled[j], shuffeled[i]];
    }

    return shuffeled;
  }