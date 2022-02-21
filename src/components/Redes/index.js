import React from 'react'

export default function Redes ({tp,icon,link}){
    return <>
        <a href={link}><i className={tp+" fa-"+icon}></i></a>
    </>
}