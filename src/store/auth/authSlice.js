
import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // 'authenticated'
        user: {},
        errorMessage: undefined,
        alert: null,
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, {payload}) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
        setAlert: (state, {payload}) => {
            state.alert = payload
        },
        setError: (state, {payload}) => {
            state.errorMessage = payload
        }
    }
});


export const { onChecking, onLogin, onLogout, clearErrorMessage, setAlert, setError } = authSlice.actions;










// import { createSlice } from "@reduxjs/toolkit";

// export const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     status: "checking",
//     uid: null,
//     email: null,
//     displayName: null,
//     photoURL: null,
//     errorMessage: null,
//   },
//   reducers: {
//     login: (state, { payload }) => {
//       state.status = "authenticated";
//       state.uid = payload.uid;
//       state.email = payload.email;
//       (state.displayName = payload.displayName),
//         (state.photoURL = payload.photoURL);
//       state.errorMessage = null;
//     },
//     logout: (state, { payload }) => {
//       state.status = "not-authenticated";
//       state.uid = null;
//       state.email = null;
//       state.displayName = null;
//       state.photoURL = null;
//       state.errorMessage = payload?.errorMessage;
//     },

//     checkingCredentials: (state) => {
//       state.status = "checking";
//     },
//   },
// });

// //Exportamos los reducers
// export const { login, logout, checkingCredentials } = authSlice.actions;
