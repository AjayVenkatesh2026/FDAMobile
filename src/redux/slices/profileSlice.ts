import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {IProfile} from 'src/types/ordering';

const initialState: {profile: IProfile} = {
  profile: {
    name: '',
    phone: '',
    address: '',
    account_status: '',
    email: '',
    favorites: [],
    id: '',
    order_history: [],
    role: '',
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<IProfile>) => {
      state.profile = action.payload;
    },
    clearProfile: state => {
      state.profile = initialState.profile;
    },
  },
});

export const {updateProfile, clearProfile} = profileSlice.actions;
export default profileSlice.reducer;
