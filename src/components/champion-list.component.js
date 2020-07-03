import React, { Component, useState, useEffect } from "react";
import ChampionDataService from "../services/champion.service";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

// export default class ChampionList extends Component {
//   constructor(props) {
//     super(props);
//     this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
//     this.retrieveChampion = this.retrieveChampion.bind(this);
//     this.refreshList = this.refreshList.bind(this);
//     this.setActiveChampion = this.setActiveChampion.bind(this);
//     this.removeAllChampion = this.removeAllChampion.bind(this);
//     this.searchTitle = this.searchTitle.bind(this);

//     this.state = {
//       champion: [],
//       currentChampion: null,
//       currentIndex: -1,
//       searchTitle: ""
//     };
//   }

//   componentDidMount() {
//     this.retrieveChampion();
//   }

//   onChangeSearchTitle(e) {
//     const searchTitle = e.target.value;

//     this.setState({
//       searchTitle: searchTitle
//     });
//   }

//   retrieveChampion() {
//     ChampionDataService.getUser(AuthService.getCurrentUser().id)
//       .then(response => {
//         this.setState({
//           champion: response.data
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   refreshList() {
//     this.retrieveChampion();
//     this.setState({
//       currentChampion: null,
//       currentIndex: -1
//     });
//   }

//   setActiveChampion(champion, index) {
//     this.setState({
//       currentChampion: champion,
//       currentIndex: index
//     });
//   }

//   removeAllChampion() {
//     console.log("tets");
//     ChampionDataService.deleteUser(AuthService.getCurrentUser().id)
//       .then(response => {
//         console.log(response.data);
//         this.refreshList();
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   searchTitle() {
//     ChampionDataService.findByTitle(this.state.searchTitle)
//       .then(response => {
//         this.setState({
//           champion: response.data
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   render() {
//     const { searchTitle, champion, currentChampion, currentIndex } = this.state;

//     return (
//       <div className="list row">
//         <div className="col-md-8">
//           <div className="input-group mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by title"
//               value={searchTitle}
//               onChange={this.onChangeSearchTitle}
//             />
//             <div className="input-group-append">
//               <button
//                 className="btn btn-outline-secondary"
//                 type="button"
//                 onClick={this.searchTitle}
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <h4>Champions List</h4>

//           <ul className="list-group">
//             {champion &&
//               champion.map((arc, index) => (
//                 <li
//                   className={
//                     "list-group-item " +
//                     (index === currentIndex ? "active" : "")
//                   }
//                   onClick={() => this.setActiveChampion(arc, index)}
//                   key={index}
//                 >
//                   {arc.title}
//                 </li>
//               ))}
//           </ul>

//           <button className="m-3 btn btn-sm btn-danger" onClick={this.removeAllChampion}>
//             Remove All
//           </button>
//         </div>
//         <div className="col-md-6">
//           {currentChampion ? (
//             <div>
//               <h4>Champion</h4>
//               <div>
//                 <label>
//                   <strong>Title:</strong>
//                 </label>{" "}
//                 {currentChampion.title}
//               </div>
//               <div>
//                 <label>
//                   <strong>Description:</strong>
//                 </label>{" "}
//                 {currentChampion.description}
//               </div>
//               <div>
//                 <label>
//                   <strong>Status:</strong>
//                 </label>{" "}
//                 {currentChampion.published ? "Published" : "Pending"}
//               </div>

//               <Link
//                 to={"/champion/" + currentChampion.id}
//                 className="badge badge-warning"
//               >
//                 Edit
//               </Link>
//             </div>
//           ) : (
//             <div>
//               <br />
//               <p>Please click on a Champion...</p>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }


const ChampionList = () => {
  const [champions , setChampions] = useState([]);
  const [currentChampion, setCurrentChampion] = useState(null);
  const [currentIndex, setCurrentIndex] =  useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveChampions();
  }, []);

  const onChangeSearchTitle = e =>{
      const searchTitle = e.target.value;
      setSearchTitle(searchTitle);
  };

  const retrieveChampions = () => {
    ChampionDataService.getUser(AuthService.getCurrentUser().id)
    .then( response => {
      setChampions(response.data);
      console.log(response.data);
    }).catch( e=> {
      console.log(e);
    });
 
  };

  const refreshList = () => {
    retrieveChampions();
    setCurrentChampion(null);
    setCurrentIndex(-1);
  };


  const setActiveChampion = (champion, index) => {
    setCurrentIndex(index);
    setCurrentChampion(champion);
  };

  const removeAllChampion = () => {
    ChampionDataService.deleteUser(AuthService.getCurrentUser().id)
    .then(response => {
      console.log(response.data);
      refreshList();
    })
    .catch(e => {
      console.log(e);
    });
  };

  const findByTitle = () => {
    ChampionDataService.findByTitle(searchTitle)
    .then( response => {
      setChampions(response.data);
      console.log(response.data);
    })
    .catch( e => {
      console.log(e);
    });
 
  };



  return ( 
<div className="list row">
    <div className="col-md-8">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchTitle}
          onChange={onChangeSearchTitle}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByTitle}
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <h4>Champions List</h4>

      <ul className="list-group">
        {champions &&
          champions.map((arc, index) => (
            <li
              className={
                "list-group-item " +
                (index === currentIndex ? "active" : "")
              }
              onClick={() => setActiveChampion(arc, index)}
              key={index}
            >
              {arc.title}
            </li>
          ))}
      </ul>

      <button className="m-3 btn btn-sm btn-danger" onClick={removeAllChampion}>
        Remove All
      </button>
    </div>
    <div className="col-md-6">
      {currentChampion ? (
        <div>
          <h4>Champion Profile</h4>
          <div>
            <label>
              <strong>Nama Champion:</strong>
            </label>{" "}
            {currentChampion.title}
          </div>
          <div>
            <label>
              <strong>Peran / Role:</strong>
            </label>{" "}
            {currentChampion.peran}
          </div>
          <div>
            <label>
              <strong>Deskripsi:</strong>
            </label>{" "}
            {currentChampion.description}
          </div>
          <div>
            <label>
              <strong>Status:</strong>
            </label>{" "}
            {currentChampion.published ? "Published" : "Pending"}
          </div>

          <Link
            to={"/champion/" + currentChampion.id}
            className="badge badge-warning"
          >
            Edit
          </Link>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Champion...</p>
        </div>
      )}
    </div>
</div>
);

};


export default ChampionList;