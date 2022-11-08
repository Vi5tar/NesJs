import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Script from 'next/script'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Web3 NES Emulator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <input id="rom" type="file" />
        <button id="pause">Pause</button>
        <button id="reset">Reset</button>
        <button id="hardreset">Power cycle</button>
        <button id="runframe">Run 1 frame</button><br />
        <canvas id="output"></canvas>
        <pre id="log"></pre>
        <p>
          NesJs, by elzo_d. <a href="debug.html">Debugger</a>, <a href="nsfplayer.html">NsfJs</a>.<br />
          Source on <a href="https://github.com/elzo-d/NesJs">Github</a>.
        </p>
      </main>

      <footer className={styles.footer}>
        
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
      <Script src="nesjs/js/main.js" />
    </div>
  )
}
