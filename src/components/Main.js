import React, { Component } from 'react';
import { convertBytes } from './helpers';
import moment from 'moment'

class Main extends Component {

  render() {
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
                <input type='file' name='file-obj' onChange={this.props.captureFile} id='file-inp' />
                <button type='submit' > upload </button>
              </form>


              {/* Creatining uploading card ... */}
              {/* Uploading file... */}
              <p>&nbsp;</p>
              {/* Create Table*/}
              <table className="table-sm table-bordered text-monospace" style={{ width: '1000px', maxHeight: '450px' }}>
                {/* Set table columns */}
                {/* Mapping rows... */}
              </table>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;