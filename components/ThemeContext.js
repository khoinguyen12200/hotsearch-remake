import React from 'react';
export const themes = { light: "light-theme", dark: "dark-theme" };
const StoreContext = React.createContext(null);


export function ThemeProvider({children}){
    const reducer = (state,action) => {
        changeTheme(action);
        return action;
    }
    const [theme,setTheme] = React.useReducer(reducer,themes.light);

    const store = { 
        theme,setTheme
    }
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}   

export default StoreContext;

function changeTheme(value) {
    if(typeof document == "undefined") {
        return
    }
    var root = document.getElementById("app-root");
    var clName = "App "+value;
    root.className = clName;
}