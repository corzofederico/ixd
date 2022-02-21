import React,{useState,useEffect,useContext} from 'react'
import { Link } from 'wouter'
import {db} from 'firebase.config'
import { query, collection, getDocs, where } from 'firebase/firestore';
import './Profile.css';
import Context from "userContext";

export default function Profile ({params}){
    const {user, setUser} = useContext(Context)
    const {usr,proj}=params
    const [profileData,setProfileData]=useState([]);
    const [ints,setInts]=useState([])
    const exit=()=>{
        window.localStorage.user=""
        setUser("")
    }
    useEffect(()=>{
        async function fetchInts(){
            const c_ints = collection(db,'users');
            const intsSnapshot=await getDocs(c_ints);
            setInts(intsSnapshot.docs.map(user => [...ints,(profileData.ints.indexOf(user.user.uid))&&user.data()]))
        }
        async function fetchProfile(){
            const c = collection(db,Boolean(usr)?'users':'projs');
            const q = query(c,where('uid','==',usr));
            const d = await getDocs(q);
            setProfileData(d.docs[0].data());
            if(Boolean(proj)) fetchInts()
        }
        fetchProfile()
    },[usr,proj,ints,setInts,profileData])
    const posts=[]
    return <>
        <div className="profile">
            <img src={profileData.photo ? "/users/"+profileData.photo : "/user_black.png"} alt="profile pht"/>
            <h1 className="name">{profileData.name}</h1>
            <div className="desc">{profileData.desc}</div>
        </div>
        <div className="options">
            <div className="button"><i className="fas fa-newspaper"></i> {posts.length+" posts"}</div>
            {(user===usr)?(
                Boolean(proj)?
                    <div className="button fas fa-folder" title="Archivos"></div>
                :(<>
                    <div className="button fas fa-cog" title="Configuración"></div>
                    <div className="button fas fa-sign-out" title={Boolean(usr)?"Cerrar Sesión":"Salir del proyecto"} onClick={exit}></div>
                    {false&&<div className="button fas fa-users-cog" title="Admin"></div>}
                </>)
            ):(
                Boolean(proj)?(<>
                    <div className="button fas fa-info-circle" title="Información"></div>
                    <div className="button"><i className="fas fa-users"></i> {ints.length+" integrantes"}</div>
                </>):Boolean(user)&&(
                    <Link to={"/chats/"+profileData.uid}><div className="button fas fa-comment-alt" title="Mensaje"></div></Link>
                )
            )}
            {/* <?php if($my==false){if($type=="proj"){ ?>
                <div style="cursor:pointer;" className="number fas fa-info-circle" onclick="$('div[data=info]').show();$('div[data=ints]').hide();" title="Información"></div>
                <div style="cursor:pointer;" className="number fas fa-users" onclick="$('div[data=ints]').show();$('div[data=info]').hide();" title="Integrantes"></div>
            <?php } ?>
                <div style="cursor:pointer;" className="number fas fa-comment-alt" onclick="window.location.href='<?php echo $path; ?>/chats/chat.php?id=<?php echo $id; ?>&type=<?php echo $type; ?>';" title="Mensaje"></div><?php
            }elseif($my==true){
                if($type=="proj"){ ?>
                <div style="cursor:pointer;" className="number fas fa-folder" onclick="window.location.href='<?php echo $path; ?>/proyectos/files/?id=<?php echo $id; ?>';" title="Archivos"></div><?php } ?>
                <div style="cursor:pointer;" className="number fas fa-cog" onclick="$('#cog').show();location.hash='cog';" title="Configuración"></div>
                <div style="cursor:pointer;" className="number fas fa-sign-out" onclick="window.location.href='<?php echo $path; ?>/<?php if($type=="user"){echo 'close';}elseif($type=="proj"){echo 'proyectos/exit';} ?>.php';" title="<?php if($type=="user"){echo 'Cerrar Sesión';}elseif($type=="proj"){echo 'Salir del proyecto';} ?>"></div>
            <?php if($type=="user"&&$_SESSION['fac']=="yes"){ ?>
                <div style="cursor:pointer;" className="number fas fa-users-cog" onclick="window.location.href='<?php echo $path; ?>/admin/';" title="Admin"></div>
            <?php }} ?> */}
        </div>
        {Boolean(proj)&&<>
			<div data="info">
				{/* <?php if($prof['q1']){ ?><b>¿Como surgió la Idea?</b><div className="input_div"><?php echo utf8_decode($prof['q1']); ?></div><?php } ?>
				<?php if($prof['q2']){ ?><b>¿Que necesitas Investigar?</b><div className="input_div"><?php echo utf8_decode($prof['q2']); ?></div><?php } ?>
				<?php if($prof['q3']){ ?><b>¿Con quien lo Compartirías?</b><div className="input_div"><?php echo utf8_decode($prof['q3']) ?></div><?php } ?>
				<?php if($prof['q4']){ ?><b>¿Como lo realizarías?</b><div className="input_div"><?php echo utf8_decode($prof['q4']); ?></div><?php } ?>*/}
            </div> 
			<div data="ints">
				<b>Integrantes</b>
				<div className="ints">
                    {ints&&ints.map((int)=><div className="user pointer">
						<img className="img" src={int.photo ? "/users/"+int.photo : "/user_black.png"} alt="int pht"/>
						<b>{int.name}</b>
					</div>)}
				</div>
			</div>
        </>}
        <h2>Posts</h2>
        <div className="post">
            {(user===usr)&&<button><i className="fa fa-plus"></i></button>}
        </div>
			
    </>
}