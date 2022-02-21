import React,{useState} from 'react'
import { Link } from 'wouter'
//import './Menu.css';

export default function SignIn (){
    return <>
        <form className="signin" autocomplete="off" enctype="multipart/form-data">
            <b>Nombre y Apellido:</b><br/>
            <input type="text" name="name" placeholder="Nombre y Apellido" required=""/><br/>
            <b>Contraseña:</b><br/>
            <input type="password" name="pass" placeholder="Contraseña" required=""/><br/>
            <b>Descripción personal:</b>
            <textarea name="desc" placeholder="Descripción personal" required=""></textarea>
            <b>Foto de perfil:</b>
            <label className="photo" for="photo">
                <div className="photo"></div>
                <b className="txt">Toca para seleccionar foto</b>
                <button className="cancel" type="button"><i className="fas fa-times"></i></button>
            </label>
            <input type="file" id="photo" name="photo" accept=".png,.jpg,.jpeg,.gif"/>
            <button type="submit" className="bg-blue u100 big">Crear</button>
        </form>
    </>
}