import { createContext, useEffect, useReducer } from "react";


const ThemeContext = createContext();


let ThemeReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE_THEME' :
            return { ...state, theme : action.payload};
        default :
            return state;    
    }
}

const ThemeContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ThemeReducer, {
        theme: localStorage.getItem('theme') || 'light'
    });

    useEffect(() => {
        localStorage.setItem('theme', state.theme);
    }, [state.theme]);

    let changeTheme = (theme) => {
        dispatch({ type : 'CHANGE_THEME', payload : theme})
    }

    let isDark = state.theme === 'dark';

    return (
        <ThemeContext.Provider value={{ ...state, changeTheme, isDark}}>
            { children }
        </ThemeContext.Provider>
    )
}


export { ThemeContext, ThemeContextProvider}