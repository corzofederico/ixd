import React,{useContext} from 'react'
import { Link, useLocation } from 'wouter'
import Context from "userContext";

export default function Item ({to,data,name,icon}){
    const {toogleMenuState} = useContext(Context)
    const [location,] = useLocation();
    const Icon=<i className={"fas fa-"+icon}></i>
    const Img=<img className="img" src={icon} alt="pht"/>
    return (<Link to={to} onClick={toogleMenuState}><div data={data} className={location===to&&"active"}>
        {data==="my_user"?Img:Icon}
        <b>{name}</b>
        {(data==="chats"&&false)&&<i className="new fas fa-circle color-red"></i>}
    </div></Link>);
}