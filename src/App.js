import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Switch, Route, withRouter } from 'react-router-dom';
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
    loggedInUser: null,
    signUpError: null,
    logInError: null,
    migraineFormError: null
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
    const {start, end, painlevel, notes, faveRemedy} = event.currentTarget

    axios.post(`${API_URL}/migraines/create`, {
      start: start.value,
      end: end.value,
      painlevel: painlevel.value,
      symptoms: symptoms,
      triggers: triggers,
      remedies: remedies,
      notes: notes.value,
      faveRemedy: faveRemedy.value
    }, {withCredentials: true})
      .then((res) => {
        let cloneMigraines = JSON.parse(JSON.stringify(this.state.migraines))
        cloneMigraines.push(res.data)
        this.setState({
          migraines: cloneMigraines
        }, () => {this.props.history.push('/migraines/history')})
      })
      .catch((err) => {
        this.setState({
          migraineFormError: err.response.data.errorMessage
        })
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
        this.setState({
          signUpError: err.response.data.errorMessage
        })
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
      .catch((err) => {
        this.setState({
          logInError: err.response.data.errorMessage
        })
      }) 
  }

  handleLogout = () => {
    console.log('TIME TO LOG OUT')
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
            return <AddMigraine loggedInUser={this.state.loggedInUser} onSubmit={this.handleCreateMigraine} onLogout={this.handleLogout} errorMessage={this.state.migraineFormError} {...routeProps}/>
          }}  />
          <Route path="/migraines/stats" render={() => {
            return <Stats loggedInUser={this.state.loggedInUser} migraines={this.state.migraines} onLogout={this.handleLogout}/>
          }}  />
          <Route path="/migraines/history" render={() => {
            return <History loggedInUser={this.state.loggedInUser} migraines={this.state.migraines} onLogout={this.handleLogout} onDelete={this.handleDeleteMigraine}/>
          }}  />
          <Route path="/migraines/:id/edit" render={(routeProps) => {
            return <AddMigraine loggedInUser={this.state.loggedInUser} onLogout={this.handleLogout} onEdit={this.handleEditMigraine} {...routeProps}/>
          }}  />
          <Route path="/explore" render={() => {
            return <Media onLogout={this.handleLogout}/>
          }}  />
          <Route path="/recommendations" render={() => {
            return <Recommendations onLogout={this.handleLogout}/>
          }}  />
          <Route path="/login" render={() => {
            return <Login onLogin={this.handleLogin} errorMessage={this.state.logInError}/>
          }}  />
          <Route path="/signup" render={() => {
            return <Signup onSignup={this.handleSignup} errorMessage={this.state.signUpError}/>
          }}  />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
