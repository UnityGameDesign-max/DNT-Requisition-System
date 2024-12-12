import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    role: string | null;
    isAuthenticated: boolean;
    name: string | null;
}

const initialState: UserState = {
    role: null,
    isAuthenticated: false,
    name: null
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ role: string, name: string }>) => {
            state.role = action.payload.role;
            state.isAuthenticated = true;
            state.name = action.payload.name;
            localStorage.setItem("role", action.payload.role);
            localStorage.setItem("name", action.payload.name);
        },
        logoutUser: (state) => {
            state.role = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;