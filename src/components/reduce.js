export const initialState = {
  toggle: false,
  records: [{ student_id: '', date: '', status: 'Present' }],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FORM':
      return { ...state, toggle: !state.toggle };

    case 'ADD_ROW':
      return {
        ...state,
        records: [...state.records, { student_id: '', date: '', status: 'Present' }],
      };

    case 'REMOVE_ROW':
      return {
        ...state,
        records: state.records.filter((_, i) => i !== action.index),
      };

    case 'UPDATE_RECORD':
      const updated = [...state.records];
      updated[action.index][action.field] = action.value;
      return {
        ...state,
        records: updated,
      };

    case 'RESET_FORM':
      return {
        ...state,
        records: [{ student_id: '', date: '', status: 'Present' }],
        toggle: false,
      };

    default:
      return state;
  }
};
