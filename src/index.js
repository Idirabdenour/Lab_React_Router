
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import mqtt from 'mqtt'


//''''''''''''''''''''''''mqtt''''''''''''''''''''''''''//
var port ='1234';
const client=mqtt.connect('mqtt://127.0.0.1:'+port);

//souscrit a tous les messages de serveur 
client.on('connect', function() { 
    client.subscribe('#');
    alert('connexion au serveur mqtt') ;
});

var nom=null;
var vali=[];
client.on('message', function(topic,message){
  var val=topic.search('/');
  var nam=topic.substring(val+1); 
  
  var json = JSON.parse(message);
  var value= json.value;
  var typ= json.type;
  nom=nam;
  //console.log(nom);
  vali.push(value);
});


//temp pour sauvegardé la dernière valeur enrigistré
let temp=[];
//Cette class représente MesYeux sur la porte du garage
class Porte extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    if(nom==='MesYeux'){
         temp=vali[vali.length-1];
    }
    return (
      <div className="wrapper">
       <article className="article">
        <center>
        <table>  
         <tr>  
           <td><center><h1>Porte du Garage</h1></center></td>
         </tr>  
        </table>
          <h1> {/*nom2*/} </h1>
            <br/>
            <h1>Valeur:actuelle:</h1>
            <h1>{temp}</h1>
            <br/>
            <h2>Historique</h2>
            <ul id="point" >
            </ul>
          </center>
       </article> 
      </div>
    );
  }
}
var temp1=[];
//Cette class représente temperatureChambre
class Bureau extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
   if(nom==='temperatureChambre'){
      temp1=vali[vali.length-1];
      console.log(nom);
  }
    return (
     <div className="wrapper">
      <article className="article">
       <center>
       <table>  
         <tr>  
           <td><center><h1>Température Bureau</h1></center></td>
         </tr>  
        </table>
         <h1> {/*nom1*/} </h1>
         <br/>
         <h1>Valeur:actuelle:</h1>
         <h1>{Math.round(temp1)+'°'}</h1>
         <br/>
         <h2>Historique:</h2>
         <table>  
          <tr>  
           <td>
             <ul id="point" >
             </ul>
            </td>
          </tr>  
        </table>
        </center>
      </article> 
     </div>
    );
  }
}
var temp3=[];
var s=''
//Cette class représente la variable temperatureSalleA111
class Ventilateurs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    if(nom === 'temperatureSalleA111'){
      temp3=vali[vali.length-1];
    }
    if(Math.round(temp3)!==0){
      s=Math.round(temp3)+'°';
    }
    return (
    <div className="wrapper">
      <article className="article">
       <center>
         <table>  
         <tr>  
           <td><center><h1>Ventilateur</h1></center></td>
         </tr>  
        </table>  
         <h1> {/*nom3*/} </h1>
         <br/>
         <h1>Valeur:actuelle:</h1>
         <h1>{/*Math.round(temp3)+'°'*/s}</h1>   
         <br/>
         <h2>Historique:</h2>
         <table>  
         <tr>  
           <td>
             <ul id="point" >
             </ul>
             
           </td>
         </tr>  
        </table>
         
       </center>
      </article> 
     </div>
    );
  }
}
var list;
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value : 1
      };
    }
    inc() {
      this.setState({
        value:this.state.value + 1 
      });
    }
    
      render() {
        return (
          <Router>
            <body className="body">
              <header className="header">
              <center>
                URL du Brocker: <input type="text" size="25"  value={window.location}/>
              </center>
              </header>
                <div className="wrapper">
                  <Route   path="/porte_de_garage" component={Porte}/>   
                  <Route   path="/tem_bureau" component={Bureau}/>
                  <Route   path="/Ventilateur" component={Ventilateurs}/>   
                  <nav className="nav" >
                    <Link to="/tem_bureau">
                      <button className="button" onClick= {()=>{
                          var poin=document.getElementById("point")
                          let line
                          
                          if(nom==='temperatureChambre'){
                          line=document.createElement("li")
                          line.textContent=Math.round(vali[vali.length-1])+'°'
                            if(line !== null && poin !== null){
                                poin.appendChild(line)
                            }
                          }
                          }}>temp Bureau</button>
                    </Link>
                    <br/><br/>
                    <Link to="/porte_de_garage"> 
                    <button className="button" onClick= {()=>{
                          var poin=document.getElementById("point")
                          let line
                          if(nom==='MesYeux'){
                          line=document.createElement("li")
                          line.textContent=vali[vali.length-1]
                            if(line !== null && poin !== null){
                                poin.appendChild(line)
                            }
                          }
                          }}>Porte de Garage</button>
                    </Link> 
                    <br/><br/>
                    <Link to="/Ventilateur">
                    <button className="button" onClick= {()=>{
                          var poin=document.getElementById("point")
                          let line
                          if(nom==='temperatureSalleA111'){
                          line=document.createElement("li")
                          line.textContent=Math.round(vali[vali.length-1])+'°'
                            if(line !== null && poin !== null){
                                poin.appendChild(line)
                            }
                          }
                          }}>Ventilateur</button>
                    </Link>
                    </nav>  
                    <div className="aside"></div>
                </div>
                <div className="footer"></div>
            </body>
          </Router>
        );
      }
    }
  
  // ========================================
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  
 