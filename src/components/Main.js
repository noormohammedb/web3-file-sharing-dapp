import React, { Component } from 'react';
import { convertBytes } from './helpers';
import moment from 'moment'

class Main extends Component {

  render() {
    console.log("render main");
    return (
      <div className="container-fluid mt-5 text-center">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
            <div className="content">
              <p>&nbsp;</p>

              <h2>  share file </h2>
              <form onSubmit={(event) => {
                event.preventDefault();
                console.log("form submitted");
                const description = this.fileDescription.value;
                this.props.uploadFile(description);
              }}>

                <label htmlFor='file-inp'>
                  select file
                </label>
                <br />
                {/* <input type='' name='' placeholder='' ref={ } /> */}
                <input type='text' name='file-desc' placeholder='description' ref={(inp) => { this.fileDescription = inp; }} required />
                <input type='file' name='file-obj' onChange={this.props.captureFile} id='file-inp' required />
                <button type='submit' > upload </button>
              </form>


              {/* Creatining uploading card ... */}
              {/* Uploading file... */}
              {this.props.ipfsHash ?
                // <a href={`https://ipfs.infura.io/ipfs/${this.props.ipfsHash}`} target='_blank' >
                <a href='' target=''>
                  <h3 onClick={() => { window.open(`https://ipfs.infura.io/ipfs/${this.props.ipfsHash}`, "_blank"); }
                  }>ipfs://{this.props.ipfsHash}</h3>
                </a>
                // </a>
                : null}

              <p>&nbsp;</p>
              {/* Create Table*/}
              <table className="table-sm table-bordered text-monospace" style={{ width: '1000px', maxHeight: '450px' }}>
                {/* Set table columns */}
                <thead>
                  <tr>
                    <th> id </th>
                    <th> name </th>
                    <th> fileDescription </th>
                    <th> size </th>
                    <th> time </th>
                    <th> link </th>

                  </tr>
                </thead>
                <tbody>

                  {
                    this.props.files.map((file, key) => {
                      // console.log(file);
                      return (
                        <tr key={key}>
                          <td> {file.fileId} </td>
                          <td> {file.fileName} </td>
                          <td> {file.fileDescription} </td>
                          <td> {convertBytes(file.fileSize)} </td>
                          <td> {moment.unix(file.uploadTime).format("hh:mm:ss|d/mm/yy")} </td>
                          <td>
                            <a href={`https://ipfs.infura.io/ipfs/${file.fileHash}`} target='_blank' rel="noopener noreferrer">
                              click me
                            </a>
                          </td>
                        </tr>
                      );
                    })
                    // console.log(this.props.files)
                  }

                </tbody>
                {/* Mapping rows... */}
              </table>
            </div>
          </main>
        </div >
      </div >
    );
  }
}

export default Main;