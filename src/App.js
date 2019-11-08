import './index.css';
import {Button, ButtonToolbar, Alert, Card} from 'react-bootstrap';

import React, {
    useState,
    useEffect,
    useCallback
} from 'react';
import {
    useWeb3Network,
    useEphemeralKey,
    useWeb3Injected
} from '@openzeppelin/network/react';
//const { Wallet } = require("ethereumjs-wallet");
//import { utils } from '@openzeppelin/gsn-provider';
//const { isRelayHubDeployedForRecipient, getRecipientFunds } = utils;

const infuraToken = process.env.REACT_APP_INFURA_TOKEN || '95202223388e49f48b423ea50a70e336';
const walletAddress = "0x9df5d4DD565fbFF51A6b72cD9156a7101C7e291E";
const privateKey = "0x97393BF2650FE37A1367DF85C0BE68EB1FE64A722D2938C14EFB8C245B5BAB61";
const contractAddress = "0x97bac60e8f15d4a2afda72a0dd50ea04a7adcee9";
const abi2 = '[{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"mintTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"context","type":"bytes"},{"name":"success","type":"bool"},{"name":"actualCharge","type":"uint256"},{"name":"preRetVal","type":"bytes32"}],"name":"postRelayedCall","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"context","type":"bytes"}],"name":"preRelayedCall","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"setRelayHubAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialAmount","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldRelayHub","type":"address"},{"indexed":true,"name":"newRelayHub","type":"address"}],"name":"RelayHubChanged","type":"event"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"bytes"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bytes"},{"name":"","type":"uint256"}],"name":"acceptRelayedCall","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getHubAddr","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRecipientBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isMinter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"relayHubVersion","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]';
const jsonContractAbi = JSON.parse(abi2);
var wa = "";
var pk = "";

function App() {
    const [count, setCount] = useState(1);
    //const [walletAddress, setWalletAddress] = useState("-----");
    const [balance, setBalance] = useState(0);
    const [total, setTotalSupply] = useState(0);
    const [hubAddress, setHubAddress] = useState("-----");
    const [symbol, setSymbol] = useState("-----");
    const [myAddress, setMyAddress] = useState("-----");
    const callAlert = useCallback(async () => {
      alert("mintTo address:" + wa);
      sendMintTo(wa);
    }, []);

    const showPK = useCallback(async () => {
      alert(pk);
    }, []);

    //setCount(99);
    const Wallet = require('ethereumjs-wallet');
    const createAddress = async => {
        try {
          const wallet = Wallet.generate();
          //秘密鍵の生成
          //const privateKey = wallet.getPrivateKeyString();
          //秘密鍵の生成（先頭の0xを除去）
          //const privateKey = wallet.getPrivateKey();
          //console.log("秘密鍵 : " + privateKey.toString("hex"));
          //秘密鍵の生成（先頭の0xを除去）
          //公開鍵
          //const publicKey = wallet.getPublicKeyString();
          //console.log("公開鍵："+publicKey);
          //const privateKey = wallet.getPrivateKey();
          const address = wallet.getAddressString();
          setMyAddress(address);
          const privateKey = wallet.getPrivateKey();
          wa = address;
          pk = privateKey.toString("hex");
        } catch (e) {
            console.log(e);
        }
    };


    const signKey = useEphemeralKey();
    const context = useWeb3Network(`wss://rinkeby.infura.io/ws/v3/${infuraToken}`, {
        pollInterval: 15 * 1000,
        gsn: {
            signKey: privateKey,
        },
    });

    const instance2 = new context.lib.eth.Contract(jsonContractAbi, contractAddress);
    const sendMintTo = async address => {
        try {
            alert(address);
            const tx = await instance2.methods.mintTo(address, 1).send({
                from: walletAddress
            });
        } catch (e) {
            console.log(e);
        }
    };

    const balanceOf = async address => {
        try {
            const balance = await instance2.methods.balanceOf(address).call();
            setBalance(balance);
            console.log(balance);
        } catch (e) {
            console.log(e);
        }
    };

    const getSymbol = async () => {
        try {
            const symbol = await instance2.methods.symbol().call();
            setSymbol(symbol);
        } catch (e) {
            console.log(e);
        }
    };

    const getTotalSupply = async () => {
        try {
            const _totalSupply = await instance2.methods.totalSupply().call();
            setTotalSupply(_totalSupply);
        } catch (e) {
            console.log(e);
        }
    };

    const getHubAddr = async () => {
        try {
            const hubAddress = await instance2.methods.getHubAddr().call();
            setHubAddress(hubAddress);
        } catch (e) {
            console.log(e);
        }
    };

    function init(){

  localStorage.setItem('rememberMe', "aaaa");
  const rememberMe = localStorage.getItem('rememberMe');
  console.log(rememberMe);

      balanceOf(wa);
      getSymbol();
      getTotalSupply();
      getHubAddr();
    }

    function reload(){
      alert("reload data ? address:" + wa);
      balanceOf(wa);
      getSymbol();
      getTotalSupply();
      getHubAddr(); 
    }

    init();

    return (



      <div className="App">


<p> <Button onClick={callAlert}>test</Button></p>

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>

<p>

<div class="p-3 mb-2 bg-info text-dark">FEG WALLET</div>
<div class="p-3 mb-2 bg-light text-dark">address:{myAddress}</div>
<p> <Button onClick={createAddress}>create new address</Button> <Button onClick={showPK}>show pk</Button> <Button onClick={reload}>Reload</Button></p>


<div class="p-3 mb-2 bg-light text-dark">symbol:{symbol}</div>
<div class="p-3 mb-2 bg-light text-dark">hubAddress:{hubAddress}</div>


<div class="p-3 mb-2 bg-light text-dark">balance:{balance}</div>

<div class="p-3 mb-2 bg-light text-dark">total:{total}</div>

<Card style={{ width: '25rem' }}>
  <Card.Body>
    <Card.Title> Title </Card.Title>
    <Card.Text>
      aaaaaaaaaaaa
    </Card.Text>
    <Button variant="primary">CHECKIN</Button>
  </Card.Body>
</Card>
<Card style={{ width: '25rem' }}>
  <Card.Body>
    <Card.Title> Title </Card.Title>
    <Card.Text>
      aaaaaaaaaaaa
    </Card.Text>
    <Button variant="primary">CHECKIN</Button>
  </Card.Body>
</Card>
</p>





      </div>
    );

}

export default App;
