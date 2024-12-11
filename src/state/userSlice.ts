import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    role: string | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    role: null,
    isAuthenticated: false
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ role: string }>) => {
            state.role = action.payload.role;
            state.isAuthenticated = true;
            localStorage.setItem("role", action.payload.role);
        },
        logoutUser: (state) => {
            state.role = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;