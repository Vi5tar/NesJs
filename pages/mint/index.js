import Head from "next/head";
import styles from "../../styles/Home.module.css";
import abi from "../../memory-cards/MemoryCards.json";
import { ethers } from "ethers";

export default function Mint({ connectedWallet, connectWallet }) {
  const mintMemoryCard = async () => {
    console.log('Minting Memory Card');
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const memoryCardsContract = new ethers.Contract(
          process.env.NEXT_PUBLIC_MEMORY_CARD_CONTRACT_ADDRESS,
          abi.abi,
          signer
        );

        const mintTransaction = await memoryCardsContract.mint();
        await mintTransaction.wait();

        console.log(`Memory Card Transaction: ${mintTransaction.hash}`);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Web3 NES Emulator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {connectedWallet ? (
          <button onClick={mintMemoryCard}>Mint Memory Card</button>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </main>
    </div>
  );
}
