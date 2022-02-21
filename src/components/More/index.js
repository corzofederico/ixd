import React from 'react'

export default function More ({title,icon,link}){
    return <>
        <a href={link}><div>
            <div className="prev"><i className={"fas fa-"+icon}></i></div>
            <h4 className="name">{title}</h4>
        </div></a>
    </>
}