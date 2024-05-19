import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const ConnectWallet = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(web3Instance);
        } catch (error) {
          console.error('User denied account access');
        }
      } else {
        console.error('No Ethereum provider detected');
      }
    };

    loadWeb3();
  }, []);

  useEffect(() => {
    const fetchAccount = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      }
    };

    fetchAccount();
  }, [web3]);

  const handleConnectWallet = async () => {
    if (!web3) {
      console.error('Web3 not initialized');
      return;
    }
    try {
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  return (
    <div>
      <h1>Connect Your Ethereum Wallet</h1>
      {account ? (
        <p>Connected Account: {account}</p>
      ) : (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;