import styles from "../../styles/MemoryCard.module.css";
import MintPrompt from "./mint-prompt";
import { useState, useEffect } from 'react'
import { Alchemy } from "alchemy-sdk";

const alchemy = new Alchemy({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, network: process.env.NEXT_PUBLIC_ALCHEMY_NETWORK });
const selectedMemoryCardInitialState = 'none';

export default function MemoryCard({ connectedWallet, connectWallet }) {
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
          </div>
        ) : <MintPrompt address={ uiFriendlyAddress() } />
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}
