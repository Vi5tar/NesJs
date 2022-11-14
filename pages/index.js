import Head from "next/head";
import styles from "../styles/Home.module.css";
import Script from "next/script";
import MemoryCard from "./components/memory-card";
import { useState } from 'react'

export default function Home({ connectedWallet, connectWallet }) {
  const [acessibleNes, setAcessibleNes] = useState({});

  const getNesState = () => {
    return acessibleNes.getState();
  };

  const setNesState = (state) => {
    acessibleNes.setState(state);
  };

  const getNesBattery = () => {
    return acessibleNes.getBattery();
  };

  const setNesBattery = (battery) => {
    acessibleNes.setBattery(battery);
  };

  const getLoadedName = () => {
    return acessibleNes.loadedName
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Web3 NES Emulator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.controls}>
          <input id="rom" type="file" />
          <button id="pause">Pause</button>
          <button id="reset">Reset</button>
          <button id="hardreset">Power cycle</button>
          <button id="runframe">Run 1 frame</button>
        </div>
        <MemoryCard connectedWallet={connectedWallet} connectWallet={connectWallet} getNesState={getNesState} setNesState={setNesState} getNesBattery={getNesBattery} setNesBattery={setNesBattery} getLoadedName={getLoadedName} />
        <canvas id="output"></canvas>
        <pre id="log"></pre>
      </main>

      <footer className={styles.footer}>
        <p>
          NesJs, by elzo_d. <a href="debug.html">Debugger</a>,{" "}<a href="nsfplayer.html">NsfJs</a>.
        </p>
        <p>
          Source on <a href="https://github.com/elzo-d/NesJs">Github</a>.
        </p>
      </footer>
      <Script src="nesjs/lib/zip.js" />
      <Script src="nesjs/lib/inflate.js" />
      <Script src="nesjs/nes/mappers.js" />
      <Script src="nesjs/mappers/nrom.js" />
      <Script src="nesjs/mappers/mmc1.js" />
      <Script src="nesjs/mappers/uxrom.js" />
      <Script src="nesjs/mappers/cnrom.js" />
      <Script src="nesjs/mappers/mmc3.js" />
      <Script src="nesjs/mappers/axrom.js" />
      <Script src="nesjs/nes/cpu.js" />
      <Script src="nesjs/nes/pipu.js" />
      <Script src="nesjs/nes/apu.js" />
      <Script src="nesjs/nes/nes.js" />
      <Script src="nesjs/js/audio.js" />
      <Script src="nesjs/js/main.js" onLoad={() => {setAcessibleNes(nes)}} />
    </div>
  );
}
