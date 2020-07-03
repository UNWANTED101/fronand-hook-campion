import React, { Component, useState } from "react";
import ChampionDataService from "../services/champion.service";
import AuthService from "../services/auth.service";


// export default class AddChampion extends Component {
//   constructor(props) {
//     super(props);
//     this.onChangeTitle = this.onChangeTitle.bind(this);
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.saveChampion = this.saveChampion.bind(this);
//     this.newChampion = this.newChampion.bind(this);

//     this.state = {
//       id: null,
//       title: "",
//       description: "", 
//       published: false,
//       userId : AuthService.getCurrentUser().id,
//       submitted: false
//     };
//   }

//   onChangeTitle(e) {
//     this.setState({
//       title: e.target.value
//     });
//   }

//   onChangeDescription(e) {
//     this.setState({
//       description: e.target.value
//     });
//   }

//   saveChampion() {
//     var data = {
//       title: this.state.title,
//       description: this.state.description,
//       userId : this.state.userId
//     };

//     ChampionDataService.create(data)
//       .then(response => {
//         this.setState({
//           id: response.data.id,
//           title: response.data.title,
//           description: response.data.description,
//           published: response.data.published,
//           userId: response.data.userId,
//           submitted: true
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   newChampion() {
//     this.setState({
//       id: null,
//       title: "",
//       description: "",
//       published: false,
//       userId : AuthService.getCurrentUser().id,
//       submitted: false
//     });
//   }

//   render() {
//     return (
//       <div className="submit-form">
//         {this.state.submitted ? (
//           <div>
//             <h4>You submitted successfully!</h4>
//             <button className="btn btn-success" onClick={this.newChampion}>
//               Add
//             </button>
//           </div>
//         ) : (
//           <div>
//             <div className="form-group">
//               <label htmlFor="title">Title</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="title"
//                 required
//                 value={this.state.title}
//                 onChange={this.onChangeTitle}
//                 name="title"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="description"
//                 required
//                 value={this.state.description}
//                 onChange={this.onChangeDescription}
//                 name="description"
//               />
//             </div>

//             <button onClick={this.saveChampion} className="btn btn-success">
//               Submit
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   }

// }


const AddChampion = () => {

  const initialChampionState = {
    id: null,
    title: "",
    description: "", 
    peran:"",
    published: false,
    userId : AuthService.getCurrentUser().id,

  };

  const [champion , setChampion]  = useState(initialChampionState);
  const [submitted , setSubmitterd] = useState(false);

  const handleInputChange = event => {
      const {name , value} = event.target;
      setChampion({...champion, [name] :  value});
  };

  const saveChampion = () => {
    var data = {
      title : champion.title,
      peran:champion.peran,
      description : champion.description,
      userId : AuthService.getCurrentUser().id,
    };

    ChampionDataService.create(data).then(
      response => {
        setChampion({
          id : response.data.id,
          title : response.data.title,
          peran: response.data.peran,
          description : response.data.description,
          published : response.data.published

        });

        setSubmitterd(true);
        console.log(response.data);
      }).catch( e => {
        console.log(e);
      });
  };

  const newChampion = () => {
    setChampion(initialChampionState);
    setSubmitterd(false);

  };

  return(
    <div className="submit-form">
    {submitted ? (
      <div>
        <h4>You submitted successfully!</h4>
        <button className="btn btn-success" onClick={newChampion}>
          Add
        </button>
      </div>
    ) : (
      <div>
        <div className="form-group">
          <label htmlFor="title">Nama Champion</label>
          <input
            type="text"
            className="form-control"
            id="title"
            required
            value={champion.title}
            onChange={handleInputChange}
            name="title"
          />
        </div>

        
        <div className="form-group">
          <label htmlFor="peran">Peran</label>
          <input
            type="text"
            className="form-control"
            id="peran"
            required
            value={champion.peran}
            onChange={handleInputChange}
            name="peran"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            required
            value={champion.description}
            onChange={handleInputChange}
            name="description"
          />
        </div>
        <button onClick={saveChampion} className="btn btn-success">
          Submit
        </button>
      </div>
    )}
  </div>
  );
};

export default AddChampion;