import styles from "../../styles/MemoryCard.module.css";
import MintPrompt from "./mint-prompt";
import { useState, useEffect } from 'react'
import { Alchemy } from "alchemy-sdk";
import abi from "../../memory-cards/MemoryCards.json";
import { ethers } from "ethers";

const alchemy = new Alchemy({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, network: process.env.NEXT_PUBLIC_ALCHEMY_NETWORK });
const selectedMemoryCardInitialState = 'none';

export default function MemoryCard({ connectedWallet, connectWallet, setNesBattery, getNesBattery, getLoadedName }) {
  const [memoryCards, setMemoryCards] = useState([]);
  const [selectedMemoryCard, setSelectedMemoryCard] = useState(selectedMemoryCardInitialState);

  useEffect(() => {
    if (connectedWallet) {
      alchemy.nft.getNftsForOwner(connectedWallet, { contractAddresses: [process.env.NEXT_PUBLIC_MEMORY_CARD_CONTRACT_ADDRESS] })
        .then((nfts) => {
          setMemoryCards(nfts.ownedNfts);
        });
    }
  }, [connectedWallet]);

  const uiFriendlyAddress = () => {
    if (connectedWallet) {
      return `${connectedWallet.slice(0, 6)}...${connectedWallet.slice(
        connectedWallet.length - 4,
        connectedWallet.length
      )}`;
    }
  };

  const connectedWalletHasMemoryCard = () => {
    return (memoryCards.length);
  };

  const saveState = async () => {
    console.log('Saving to memory card');
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

        const saveGameTransaction = await memoryCardsContract.saveGame(selectedMemoryCard, getLoadedName(), getNesBattery().data.toString());
        await saveGameTransaction.wait();

        console.log(`Game Save Transaction: ${saveGameTransaction.hash}`);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadState = async () => {
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

        const gameData = await memoryCardsContract.loadGame(selectedMemoryCard, getLoadedName());

        const battery = {data: gameData.split(',').map(string => parseInt(string))}
        setNesBattery(battery);
        console.log('battery set');
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      {connectedWallet ? (
        connectedWalletHasMemoryCard() ? (
          <div>
            <p>{`${uiFriendlyAddress()}'s Memory Cards:`}</p>
            <select onChange={event => setSelectedMemoryCard(event.target.value)} value={selectedMemoryCard}>
              <option value={selectedMemoryCardInitialState}> -- no memory card selected -- </option>
              {memoryCards.map(memoryCard => (<option key={memoryCard.tokenId} value={memoryCard.tokenId}>{memoryCard.title}</option>))}
            </select>
            <button onClick={ saveState }>save to card</button>
            <button onClick={ loadState }>load from card</button>
          </div>
        ) : <MintPrompt address={ uiFriendlyAddress() } />
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}
