import { createSlice } from '@reduxjs/toolkit';

// SLICE
const slice = createSlice({
  name: 'team',
  initialState: {
    team: 'ARI',
  },
  reducers: {
    setTeam: (state, action) => {
      state.team = action.payload;
    },
  },
});

export default slice.reducer;

const { setTeam } = slice.actions;

export const chooseTeam = team => dispatch => {
  console.log('about to dispatch set team: ', team);
  dispatch(setTeam(team));
};
