import { db, auth } from 'firebase.config'
import { addDoc, collection } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import React,{ useContext } from 'react';
import { useLocation, Link  } from 'wouter'
import './Log.css';
import Context from "userContext";

export default function Log({params}) {
    const {user, setUser} = useContext(Context)
    const [,navigate] = useLocation()
    if(user.length>0){navigate('/');return <></>}
    const {type}=params
    const types={"check":"Registro","start":"Inicia Sesión","qr":"Inicio con QR"}
    const submit=async (e)=>{
        e.preventDefault();
        const mail="corzofederico95@gmail.com"
        const name="Federico Corzo"
        const pass="passssssss"
        if(type==="start"){
            await signInWithEmailAndPassword(auth, mail, pass).then(user=>{
                console.log(user)
                window.localStorage.user=user.user.uid
                setUser(user.user.uid)
                navigate('/')
            }).catch(error => {
                alert("error: "+error);
            });
        }
        if(type==="check"){
            await createUserWithEmailAndPassword(auth, mail, pass).then(user=>{
                window.localStorage.user=user.user.uid
                setUser(user.user.uid)
                addDoc(collection(db, "users"), {
                    uid:user.user.uid,
                    mail: user.user.email,
                    name: name,
                    desc: "",
                    photo: ""
                });
                navigate('/')
            }).catch(error => {
                alert("error: "+error);
            });
        }
    }
    return <>
        <h1 className="header">{types[type]}</h1>
        <div className="options">
            {Object.keys(types).map((key, i)=>{
                return type!==key&&<Link to={"./"+key}><div className="button">{types[key]}</div></Link>
            })}
        </div>
        {type==="qr"?
        <o class="login_qr">
            <div class="txt_qr"></div>
            <button data="orig" className="btn_scan u100 big bg-blue border0">Escanear QR</button>
            <canvas id="qr-canvas"></canvas>
            <div id="container"></div>
        </o>
        :
        <form onSubmit={submit}>
            <input type="text" name="name" placeholder="Nombre completo" required=""/>
            <input type="password" name="pass" placeholder="Contraseña" required=""/>
            {type==="check"&&<>
            <textarea name="desc" placeholder="Descripción personal" required=""></textarea>
            <b>Foto de perfil:</b>
            <label className="photo" for="photo">
                <div className="photo"></div>
                <b className="txt">Toca para seleccionar foto</b>
                <button className="cancel" type="button"><i className="fas fa-times"></i></button>
            </label>
            <input type="file" id="photo" name="photo" accept=".png,.jpg,.jpeg,.gif"/>
            </>}
            <button type="submit" className="bg-blue">Iniciar</button>
        </form>
        }
    </>
}