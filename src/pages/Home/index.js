import React from "react";
import './Home.css'

import Log from "components/log";
import More from "components/More";
import Pubs from "components/Pubs";
import Redes from "components/Redes";

export default function Home () {
    return <>
        <div className="header">
            <img src="/ixd_bahia.svg" alt="IxD logo"/>
            <div className="frace">
                <h1>“EN LOS MOMENTOS DE CRISIS LA CREATIVIDAD ES MÁS IMPORTANTE QUE EL CONOCIMIENTO”<br/>- ALBERT EINSTEIN</h1>
                <div className="redes">
                    <Redes tp="fab" icon="whatsapp" link=""/>
                    <Redes tp="fas" icon="phone-rotary" link=""/>
                    <Redes tp="fab" icon="facebook" link=""/>
                    <Redes tp="fab" icon="youtube" link=""/>
                    <Redes tp="fab" icon="instagram" link=""/>
                </div>
            </div>
        </div>
        <Log type="normal"/>
        <h2>IxD en casa</h2>
        <div className="more" align="center">
            <More title="Videos" icon="video" link="https://www.youtube.com/c/IxDBahia/playlists?view=50&sort=dd&shelf_id=5"/>
            <More title="Desafios" icon="award" link="https://www.youtube.com/playlist?list=PL991ziqAAi3YFltO_l3DdKveEStflcUIF"/>
        </div>
        <h2>Ultimas novedades</h2>
        <Pubs/>
    </>
}