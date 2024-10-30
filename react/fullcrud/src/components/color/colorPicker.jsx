import React from "react";
import Style from "./colorPicker.module.css";

function ColorPicker({onColorSelect}){
    const colors=["red", 
    "blue", 
    "green", 
    "purple", 
    "orange", 
    "pink"];
    return(
        <div className={Style.color}>
            {colors.map((color,index)=>(
                <div
                    key={index}
                    className={Style.colorCircle}
                    style={{backgroundColor: color}}
                    onClick={()=> onColorSelect(color)}
                />
            ))}
        </div>
    );
}
export default ColorPicker;