import DStorage from '../abis/DStorage.json'
// import DStorage from '../contracts/artifacts/DStorage.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

//Declare IPFS
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({ host: "ipfs.infura.io", port: 5001, protocol: "https" });


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    //Setting up Web3
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("Non ethereum browser detected, install metamask");
    }
  }

  async loadBlockchainData() {
    //Declare Web3
    const web3 = window.web3;
    console.log(web3);

    //Load account
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({ account: accounts[0] })

    //Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = DStorage.networks[networkId]

    //IF got connection, get data from contracts
    if (networkData) {
      //Assign contract
      const dstorage = new web3.eth.Contract(DStorage.abi, networkData.address);
      this.setState({ dstorage });

      //Get files amount
      const fileCount = await dstorage.methods.fileCount().call();
      this.setState({ fileCount });

      //Load files&sort by the newest
      for (var i = fileCount; i >= 1; i--) {
        const filesFromChain = await dstorage.methods.allFiles(i).call();
        this.setState({ files: [...this.state.files, filesFromChain] });
      }
    }
    else {
      //alert Error
      window.alert("dstorage contract not deployed to detected network");
    }

  }

  // Get file from user
  captureFile = event => {
    event.preventDefault();

    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name
      })
      console.log('buffer: ', this.state.buffer);
    }
  }


  //Upload File
  uploadFile = description => {

    //Add file to the IPFS
    ipfs.add(this.state.buffer, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("IPFS response: ", result);
      this.setState({ loading: true, ipfsHash: result[0].path });

      if (this.state.type === '') {
        this.setState({ type: 'none' })
      }

      this.state.dstorage.methods.uploadFile(result[0].hash, result[0].size, this.state.type, this.state.name, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({
          loading: false,
          type: null,
          name: null,
        })
        console.log("transaction hash: ", hash);
        window.alert("reload in 5 sec");
        setTimeout(() => {
          window.location.reload();
        }, 5000);

      }).on('error', (e) => {
        console.log("error: ", e);
        alert("error");
        this.setState({ loading: false });
      });
    });

  }

  //Set states
  constructor(props) {
    super(props)
    this.state = {
      account: "",
      dstorage: null,
      files: [],
      loading: false,
      type: null,
      name: null,
      ipfsHash: null,
    }
    //Bind functions
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        {this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
            files={this.state.files}
            captureFile={this.captureFile}
            uploadFile={this.uploadFile}
            ipfsHash={this.state.ipfsHash}
            files={this.state.files}
          />
        }
      </div>
    );
  }
}

export default App;