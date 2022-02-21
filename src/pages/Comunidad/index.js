import {db} from 'firebase.config'
import React,{useState,useEffect} from 'react'
import { query, collection, getDocs , orderBy, startAt, endAt } from 'firebase/firestore';
import {useLocation, Link} from 'wouter'
import 'users.css'
import './Comunidad.css'

export default function Comunidad ({params}) {
    const [,navigate] = useLocation()
    const {search}=params
    const [users,setUsers]=useState([])
    const searchSubmit = (e) => {
        e.preventDefault();
        navigate('/comunidad/'+new FormData(e.target).get('search'))
    }

    useEffect(()=>{
        async function fetchUsers(){
            const c = collection(db,'users');
            const q = query(c,orderBy('name'),startAt(`%${search}%`),endAt(search+(search?"\uf8ff":"")));
            const usersSnapshot=await getDocs(q);
            setUsers(usersSnapshot.docs.map(user => user.data()))
        }
        fetchUsers()
    },[search,setUsers])

    return <>
    <h1 className='header'>Comunidad</h1>
    <form className="form_search" onSubmit={searchSubmit}>
        <input type="text" name="search" placeholder="Buscar..." defaultValue={search}/>
        <button type="submit" className="icon fas fa-search"></button>
    </form>
    {users.length===0 && <div align="center" className='advisment'>
        <img src="/non-posts.svg" alt="no posts"/>
        <h2>No se encontro nada{search?" con "+search:""}</h2>
    </div>}
    <div id="users">
        {users && users.map(user=>{
            console.log("user",user)
            return <>
            <Link to={"/user/"+user.uid}><div>
                <img className="photo" src={user.photo ? "/users/"+user.photo : "/user_black.png"} alt="user pht"/>
                <b className="name">{user.name}</b>
            </div></Link>
            </>
        })}
    </div>
    {/* <div align="center" className='advisment'>
        <img src="/singin_2.svg"/>
        <h2>Registrate para desbloquear COMUNIDAD</h2>
        <Link to="/login"><button className="u70 big bg-blue color-white">Regístrate</button></Link>
    </div> */}
    </>
}