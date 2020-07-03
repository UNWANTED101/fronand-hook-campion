import React, { Component, useEffect, useState } from "react";
import ChampionDataService from "../services/champion.service";

// export default class Champion extends Component {
//   constructor(props) {
//     super(props);
//     this.onChangeTitle = this.onChangeTitle.bind(this);
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.getChampion = this.getChampion.bind(this);
//     this.updatePublished = this.updatePublished.bind(this);
//     this.updateChampion = this.updateChampion.bind(this);
//     this.deleteChampion = this.deleteChampion.bind(this);

//     this.state = {
//       currentChampion: {
//         id: null,
//         title: "",
//         description: "",
//         published: false
//       },
//       message: ""
//     };
//   }

//   componentDidMount() {
//     this.getChampion(this.props.match.params.id);
//   }

//   onChangeTitle(e) {
//     const title = e.target.value;

//     this.setState(function(prevState) {
//       return {
//         currentChampion: {
//           ...prevState.currentChampion,
//           title: title
//         }
//       };
//     });
//   }

//   onChangeDescription(e) {
//     const description = e.target.value;
    
//     this.setState(prevState => ({
//       currentChampion: {
//         ...prevState.currentChampion,
//         description: description
//       }
//     }));
//   }

//   getChampion(id) {
//     console.log(id);
//     ChampionDataService.get(id)
//       .then(response => {
//         this.setState({
//           currentChampion: response.data
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   updatePublished(status) {
//     var data = {
//       id: this.state.currentChampion.id,
//       title: this.state.currentChampion.title,
//       description: this.state.currentChampion.description,
//       published: status
//     };

//     ChampionDataService.update(this.state.currentChampion.id, data)
//       .then(response => {
//         this.setState(prevState => ({
//           currentChampion: {
//             ...prevState.currentChampion,
//             published: status
//           }
//         }));
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   updateChampion() {
//     ChampionDataService.update(
//       this.state.currentChampion.id,
//       this.state.currentChampion
//     )
//       .then(response => {
//         console.log(response.data);
//         this.setState({
//           message: "The champion was updated successfully!"
//         });
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   deleteChampion() {    
//     ChampionDataService.delete(this.state.currentChampion.id).then(response => {
//         console.log(response);
//         this.props.history.push('/champion')
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   render() {
//     const { currentChampion } = this.state;

//     return (
//       <div>
//         {currentChampion ? (
//           <div className="edit-form">
//             <h4>Champion</h4>
//             <form>
//               <div className="form-group">
//                 <label htmlFor="title">Title</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="title"
//                   value={currentChampion.title}
//                   onChange={this.onChangeTitle}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="description">Description</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="description"
//                   value={currentChampion.description}
//                   onChange={this.onChangeDescription}
//                 />
//               </div>

//               <div className="form-group">
//                 <label>
//                   <strong>Status:</strong>
//                 </label>
//                 {currentChampion.published ? "Published" : "Pending"}
//               </div>
//             </form>

//             {currentChampion.published ? (
//               <button
//                 className="badge badge-primary mr-2"
//                 onClick={() => this.updatePublished(false)}
//               >
//                 UnPublish
//               </button>
//             ) : (
//               <button
//                 className="badge badge-primary mr-2"
//                 onClick={() => this.updatePublished(true)}
//               >
//                 Publish
//               </button>
//             )}

//             <button
//               className="badge badge-danger mr-2"
//               onClick={this.deleteChampion}
//             >
//               Delete
//             </button>

//             <button
//               type="submit"
//               className="badge badge-success"
//               onClick={this.updateChampion}
//             >
//               Update
//             </button>
//             <p>{this.state.message}</p>
//           </div>
//         ) : (
//           <div>
//             <br />
//             <p>Please click on a Champion...</p>
//           </div>
//         )}
//       </div>
//     );
//   }
// }


const Champion = props => {
 const initialChampionState = {
    id :  null,
    title : "",
    peran:"",
    description : "",
    published :  false
 } ;

 const [currentChampion, setCurrentArtilce] = useState(initialChampionState);
 const [message, setMessage] = useState("");

 const getChampion = id => {
  ChampionDataService.get(id).then(
    response => {
      setCurrentArtilce(response.data);
      console.log(response.data);
    }).catch(
      e => {
        console.log(e);
      }
    ); 
; }


useEffect(()=>{
    getChampion(props.match.params.id);
}, [props.match.params.id]);

const handleInputChange =  event => {
  const {name , value} =  event.target;
  setCurrentArtilce({...currentChampion, [name] : value});
};

const updatePublished = status => {
  var data = {
     id: currentChampion.id,
      title: currentChampion.title,
      description: currentChampion.description,
      peran:currentChampion.peran,
      published: status
  };

  ChampionDataService.update(currentChampion.id, data)
  .then(response => {
    setCurrentArtilce({...currentChampion,published:status});
    console.log(response.data);
  })
  .catch( e => {
    console.log(e);
  });
}

const updateChampion = () => {
  ChampionDataService.update(currentChampion.id, currentChampion)
  .then(response => {
    console.log(response.data);
    setMessage("The champion was updated successfully!");
  })
  .catch(e => {
    console.log(e);
  });
};

const deleteChampion= () => {
  ChampionDataService.delete(currentChampion.id)
  .then( response => {
    console.log(response.data);
    props.history.push("/champion");
  })
  .catch( e => {
    console.log(e);
  });
};

return(
  <div>
  {currentChampion ? (
    <div className="edit-form">
      <h4>Champion</h4>
      <form>
        <div className="form-group">
          <label htmlFor="title">Nama Champion</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={currentChampion.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="peran">Peran</label>
          <input
            type="text"
            className="form-control"
            id="peran"
            value={currentChampion.peran}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={currentChampion.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>
            <strong>Status:</strong>
          </label>
          {currentChampion.published ? "Published" : "Pending"}
        </div>
      </form>

      {currentChampion.published ? (
        <button
          className="badge badge-primary mr-2"
          onClick={() => updatePublished(false)}
        >
          UnPublish
        </button>
      ) : (
        <button
          className="badge badge-primary mr-2"
          onClick={() => updatePublished(true)}
        >
          Publish
        </button>
      )}

      <button
        className="badge badge-danger mr-2"
        onClick={deleteChampion}
      >
        Delete
      </button>

      <button
        type="submit"
        className="badge badge-success"
        onClick={updateChampion}
      >
        Update
      </button>
      <p>{message}</p>
    </div>
  ) : (
    <div>
      <br />
      <p>Please click on a Champion...</p>
    </div>
  )}
</div>
);
  }
export default Champion;