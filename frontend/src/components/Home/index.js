import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase/context'
import { StorageConext } from '../Session/context';
 
class HomeBase extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageUrl: '',
      imgList: '',
    };
  }

  handleImageFile = (e) =>{
    const imageUrl = e.target.files[0];
    this.setState( { imageUrl });
  }

  handleUpload = (e) => {
    e.preventDefault();
    console.log("start");

    if(this.imageUrl === ''){
      console.error("error uploading file. wrong type?");
    }

    const uploadTask = this.props.storage.ref(`/gallery/${this.state.imageUrl.name}`).put(this.state.imageUrl);

    uploadTask.on('state_changed', 
      (snapshot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapshot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        this.props.storage.ref('gallery').child(this.state.imageUrl.name).getDownloadURL()
        .then(fireBaseUrl => {
          this.setState({imgUrl: fireBaseUrl})
        });
        this.props.storage.ref().child('gallery').listAll().then( (res) => {
          console.log(res);
          this.state.imgList = [...res.items];
          let idx = 0;
          res.items.forEach((item) => {
            item.getDownloadURL().then((url) => {
              this.state.imgList[idx++] = (<li><img alt="ree" src={url} /></li>);
            });
          });
        });
      })
  }

  renderImages = (imgList) => {
    let lst = [...imgList]
    console.log("hi!");
    if (imgList.length && React.isValidElement(imgList[0])) {    
      return (
        <ul>
        {
          lst.map(item => {
            console.log(item);
            return item;
          })
        }
        </ul>
      );
    } else{
      return (
        <ul>

        </ul>
      )
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div>
          <form onSubmit={this.handleUpload}>
            <input
              type="file"
              onChange={this.handleImageFile} />
            <button>Upload image to firebase</button>
          </form>
        </div>
        <div>
          {this.renderImages(this.state.imgList)}
        </div>
      </div>
    );
  }
}

const HomePage =  () => (
  <div>
    <AuthUserContext.Consumer>
      { authUser => authUser ?
        (<StorageConext.Consumer>
            { storage => <HomeBase authUser={authUser} storage={storage}/> }
        </StorageConext.Consumer>) : <HomeBase authUser={null} /> }
    </AuthUserContext.Consumer>
  </div>
)
 
export default withFirebase(HomePage);