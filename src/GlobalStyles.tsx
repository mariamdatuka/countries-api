import { createGlobalStyle} from "styled-components";

export const GlobalStyles=createGlobalStyle<{lightTheme:boolean}>`
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
    
    body{
        font-family:'Nunito Sans', sans-serif;
        font-size:'14px';
        background-color:${props=>(props.lightTheme?'#f2f2f2':'#202C36')};
        color:${props=>(props.lightTheme?'#111517':'#fff')};
    } 
`