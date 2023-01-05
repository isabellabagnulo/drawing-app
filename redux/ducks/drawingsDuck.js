import { createSlice } from "@reduxjs/toolkit";

export const setDrawings = (drawings) => dispatch => {
    try {
        return dispatch(setDrawingsAction(drawings))
    } catch (e) {
        return console.error(e.message)
    }
}

export const initDrawings = () => dispatch => {
    try {
        return dispatch(initDrawingsAction())
    } catch (e) {
        return console.error(e.message)
    }
}

const drawingsDuck = createSlice(
    {
        name: 'drawingsDuck',
        initialState: {
            drawings: [],
        },
        reducers: {
            setDrawingsAction: (state, action) => {
                state.drawings = action.payload.drawings
            },
            initDrawingsAction: (state, action) => {
                state.drawings = []
            },
        },
    }
)

export default drawingsDuck.reducer

const { setDrawingsAction, initDrawingsAction } = drawingsDuck.actions