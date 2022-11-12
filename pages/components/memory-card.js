import styles from "../../styles/MemoryCard.module.css";
import MintPrompt from "./mint-prompt";

export default function MemoryCard({ connectedWallet, connectWallet }) {
  const uiFriendlyAddress = () => {
    if (connectedWallet) {
      return `${connectedWallet.slice(0, 6)}...${connectedWallet.slice(
        connectedWallet.length - 4,
        connectedWallet.length
      )}`;
    }
  };

  const connectedWalletHasMemoryCard = () => {
    return false;
  };

  return (
    <div className={styles.container}>
      {connectedWallet ? (
        connectedWalletHasMemoryCard() ? (<div></div>) : <MintPrompt address={ uiFriendlyAddress() } />
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}
