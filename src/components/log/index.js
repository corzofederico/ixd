import React,{ useContext } from 'react'
import {Link} from 'wouter'
import './log.css'
import Context from "userContext";

export default function Log ({type}){
    const {user, toogleMenuState} = useContext(Context)
    var btn="Regístrate"
    return <>{Boolean(user)===false&&
        <Link to='/log/check' onClick={(type!=="normal")&&toogleMenuState}><div align="center" className={"sign"+(type==="normal"?" log":"")}>{type==="lmenu"?btn:<>
            <b>Descubre IxD Bahía desde tu casa</b>
            <img src="/singin.svg" alt="Illustration for signin"/>
            <button className="bg-blue big">{btn}</button>
        </>}</div></Link>
    }</>
}