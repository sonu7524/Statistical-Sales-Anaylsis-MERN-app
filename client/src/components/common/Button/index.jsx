import React from "react";
import "./styles.css";
import Button from '@mui/material/Button';

export default function ButtonComponent({text, isOutline, icon, color, bgColor}) {
    return (
        <div className="button">
            {isOutline ? (
                <Button sx={{fontSize: "2rem"}} variant="outlined" startIcon={icon}>{text}</Button>
            ): (
                <Button sx={{fontSize: "1.2rem", backgroundColor: bgColor, color: color}} variant="contained" startIcon={icon}>{text}</Button>
            )}
        </div>
    )
}