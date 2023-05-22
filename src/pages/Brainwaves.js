//GH
//ESTADO. La instancia de Neurosity y User se sincronizan con un Efecto Secundario creando una suscripción a la API de Calm
import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";

import { notion, useNotion } from "../services/notion";
import { Nav } from "../components/Nav";

import "./Brainwaves.css";

import calmPic from '../pages/calmpic.jpg';

export function Brainwaves() {

  const { user } = useNotion();
  //const [calm, setCalm] = useState(0);
  const [blurAmount, setBlurAmount] = useState(0); 
  const [brainwaves, setBrainwaves] = useState(0);
  const [alert, setAlert] = useState("");
  //const [testFinished, setTestFinished] = useState(false);
  //const [scoreClass, setScoreClass] = useState("");
  const fs = require('fs');

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }

/*}const subscription = notion.calm().subscribe((calm) => {
      const calmScore = Math.trunc(calm.probability * 100);
      const blurScore = 10;
      setCalm(calmScore);
      setBlurAmount(blurScore);
    });
  */
    const blurScore = 1;
    setBlurAmount(blurScore);
    

    const subscription = notion.brainwaves("powerByBand").subscribe((brainwaves) => {
      const alphaCh1 = brainwaves.data.alpha[1];
      const alphaCh3 = brainwaves.data.alpha[3];
      const alphaChM = (alphaCh1 + alphaCh3) / 2;

      setBrainwaves(alphaChM);

      console.log(`Valor Medio Alpha (C1 y C3): ${alphaChM}`);

      const blurScore = 1;
      setBlurAmount(blurScore);
/*
      if (alphaChM > 10) {
        setAlert("Te duermes coleguita");
        setTimeout(() => {
          setAlert("");
        }, 2000);
        setScoreClass("score-red");
        setShowSong(true);
      } else {
        setAlert("");
        setScoreClass("score-green");
        setShowImage(true);
      }
 */
      // Convert brainwaves data to CSV format
      const csvData = Object.entries(brainwaves).map(([band, power]) => `${band},${power}`).join('\n');
      
      // Write CSV data to a file
      fs.writeFile('brainwavesHola.csv', csvData, (err) => {
        if (err) {
          console.error('Error writing to CSV file:', err);
        } else {
          console.log('Brainwaves data saved to brainwaves.csv');
        }
      });

    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return (
    <main className="main-container">
      {user ? <Nav /> : null}

     {/*   
     <div className="calm-score">
        &nbsp;{calm}% <div className="calm-word">Calm</div>
      </div>
     */}

    <div className="brainwaves-container">
      <div className="brainwaves-label">PowerByBand-Alpha (C1 y C3)</div>
      {/*<div className={`brainwaves-score ${scoreClass}`}>{brainwaves.toFixed(2)}</div>*/}
    </div>
      
    {alert && <div className="alert">{alert}</div>}
    
    <div className="calm-image">
      <img src={calmPic} alt="My hola" style={{ filter: `blur(${blurAmount}px)` }}/>
    </div>

    {/*
    {testFinished && <div className="test-finished-text">Prueba finalizada</div>}
    */}

    </main>
  );
}
