import {db} from 'firebase.config'
import React,{useState,useEffect} from 'react'
import { collection, getDocs } from 'firebase/firestore';
//import {Link} from 'wouter'

export default function Pubs () {
    const [pubs,setPubs]=useState([])
    useEffect(() => {
        async function fetchPubs(){
            const pubsCol=collection(db,'pubs');
            const pubsSnapshot=await getDocs(pubsCol);
            pubsSnapshot.docs.map(pub=>setPubs([...pubs,pub.data()]))
        }
        fetchPubs();
    },[pubs,setPubs])


    return pubs && pubs.map(pub=>{
        return <></>
    })
}