import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Switch, Route, withRouter} from 'react-router-dom';
import axios from 'axios';
import {API_URL} from './config';

import Home from './components/Home'
import AddMigraine from './components/AddMigraine'
import Stats from './components/Stats'
import History from './components/History'
import Media from './components/Media'
import Recommendations from './components/Recommendations'
import Login from './components/Login'
import Signup from './components/Signup'



class App extends React.Component {

  state = {
    migraines: [],
    loggedInUser: null
  }



  componentDidMount(){
    axios.get(`${API_URL}/migraines`, {withCredentials: true})
      .then((res) => {
          this.setState({
            migraines: res.data
          })
      })
      if (!this.state.loggedInUser){
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((res) => {
            this.setState({
              loggedInUser: res.data
            })
        })
      }  
  }


  handleCreateMigraine = (event, symptoms, triggers, remedies) => {
    event.preventDefault()
    console.log(symptoms, triggers, remedies)
    const {start, end, painlevel} = event.currentTarget
    
    axios.post(`${API_URL}/migraines/create`, {
      start: start.value,
      end: end.value,
      painlevel: painlevel.value,
      symptoms: symptoms,
      triggers: triggers,
      remedies: remedies,
    }, {withCredentials: true})
      .then((res) => {
        this.props.history.push('/migraines/history')
      })
  }

  
  handleDeleteMigraine = (id) => {
    console.log(this.state.migraines)
    axios.delete(`${API_URL}/migraines/${id}`, {withCredentials: true})
      .then(() => {
          
        let filteredMigraines = this.state.migraines.filter((migraine) => {
          return migraine._id !== id
        })

        this.setState({
          migraines: filteredMigraines
        }, () => {
          this.props.history.push('/migraines/history')
        })

      })
  }

  handleEditMigraine = (updatedMigraine) => {
    axios.patch(`${API_URL}/migraines/${updatedMigraine._id}`, {
      start: updatedMigraine.start,
      end: updatedMigraine.end, 
    },  {withCredentials: true})
    .then(() => {
        let cloneMigraines = this.state.migraines.map((migraine) => {
            if (migraine._id === updatedMigraine._id) {
              migraine = updatedMigraine 
            }
            return migraine
        })
        this.setState({
          migraines: cloneMigraines
        }, () => {
          this.props.history.push('/migraines/history')
        })
    })
  }


  handleSignup = (event) => {
    event.preventDefault()
    const {username, email, password} = event.currentTarget;  
    axios.post(`${API_URL}/signup`, {
      username: username.value,
      email: email.value, 
      password: password.value
    },  {withCredentials: true})
      .then((res) => {
        this.setState({
          loggedInUser: res.data
        } ,() => {
          this.props.history.push('/migraines/new')
        })
      }) 
      .catch((err) => {
        console.log(err)
      }) 
  }

  handleLogin = (event) => {
    event.preventDefault();
    const {email, password} = event.currentTarget;
    axios.post(`${API_URL}/signin`, {
      email: email.value, 
      password: password.value
    },{withCredentials: true})
      .then((res) => {
        this.setState({
          loggedInUser: res.data
        }, () => {
          this.props.history.push('/migraines/new')
        })
      })  
  }

  handleLogout = () => {
    axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
      .then(() => {
        this.setState({
          loggedInUser: null
        }, ()=>{
          this.props.history.push('/')
        })
      })
  }


  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/migraines/new" render={(routeProps) => {
            return <AddMigraine loggedInUser={this.state.loggedInUser} onSubmit={this.handleCreateMigraine} onLogout={this.handleLogOut} {...routeProps}/>
          }}  />
          <Route path="/migraines/stats" render={() => {
            return <Stats migraines={this.state.migraines} onLogout={this.handleLogOut}/>
          }}  />
          <Route path="/migraines/history" render={() => {
            return <History loggedInUser={this.state.loggedInUser} migraines={this.state.migraines} onLogout={this.handleLogout} onDelete={this.handleDeleteMigraine}/>
          }}  />
          <Route path="/migraines/:id/edit" render={(routeProps) => {
            return <AddMigraine loggedInUser={this.state.loggedInUser} onLogout={this.handleLogOut} onEdit={this.handleEditMigraine} {...routeProps}/>
          }}  />
          <Route path="/explore/media" render={() => {
            return <Media/>
          }}  />
          <Route path="/explore/recommendations" render={() => {
            return <Recommendations/>
          }}  />
          <Route path="/login" render={() => {
            return <Login onLogin={this.handleLogin}/>
          }}  />
          <Route path="/signup" render={(routeProps) => {
            return <Signup onSignup={this.handleSignup}/>
          }}  />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
