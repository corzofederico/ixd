import React,{useState,useEffect,useContext} from 'react'
import {db} from 'firebase.config'
import { query, collection, getDocs, where } from 'firebase/firestore';
import './Menu.css';
import Log from "components/log";
import Item from './item';
import Context from "userContext";

export default function Menu (){
    const {user, setUser, menuState, toogleMenuState} = useContext(Context)
    const [userData,setUserData]=useState("");
    const signOut=()=>{
        window.localStorage.user=""
        setUser("")
        toogleMenuState()
    }
    useEffect(()=>{if(user.length>0){
        async function fetchUser(){
            const c = collection(db,'users');
            const q = query(c,where('uid','==',user));
            const d = await getDocs(q);
            setUserData(d.docs[0].data());
        }
        fetchUser()
    }},[user,setUserData])
    return <>
        <div id="btn_menu" className={"fal fa-"+((menuState==="closed")?"bars":"times")} onClick={toogleMenuState}></div>
        <div id="menu-left" className={menuState}>
            <Item to='/' data="en_casa" name="IxD en casa" icon="home"/>
            <Item to='/comunidad' data="users" name="Comunidad" icon="users"/>
            <Item to='/proyectos' data="projs" name="Proyectos" icon="lightbulb-on"/>
            <Item to='/chats' data="chats" name="Chats" icon="comments-alt"/>
            {Boolean(user)&&<Item to={'/user/'+user} data="my_user" name={userData.name} icon={userData.photo ? "/users/"+userData.photo : "/user_black.png"}/>}

            <Log type="lmenu"/>

            {Boolean(user)&&<div className="sign" onClick={signOut}>Cerrar Sesión</div>}
        </div>
        {/* <div id="ok"><i className="fad fa-check-circle"></i></div>
        <div id="error"><i className="fad fa-times-circle"></i></div>
        <div id="load"></div> */}
    </>
}