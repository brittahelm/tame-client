import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Switch, Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import {API_URL} from './config';

import Home from './components/Home'
import AddMigraine from './components/AddMigraine'
import EditMigraine from './components/EditMigraine'
import Stats from './components/Stats'
import History from './components/History'
import Media from './components/Media'
import Recommendations from './components/Recommendations'
import Login from './components/Login'
import Signup from './components/Signup'



class App extends React.Component {

  state = {
    migraines: [],
    tips: [],
    loggedInUser: null,
    signUpError: null,
    logInError: null,
    migraineFormError: null,
    tipFormError: null
  }



  componentDidMount(){
    axios.get(`${API_URL}/migraines`, {withCredentials: true})
      .then((res) => {
        axios.get(`${API_URL}/tips`, {withCredentials: true})
          .then((tipres) => {
            this.setState({
              migraines: res.data,
              tips: tipres.data
            })
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
        cloneMigraines.unshift(res.data)
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

  handleEditMigraine = (event, symptoms, triggers, remedies, updatedMigraine) => {
    event.preventDefault()
    const {start, end, painlevel, notes, faveRemedy} = event.currentTarget
    console.log('UpdatedMigraine', updatedMigraine)
    let newMigraine = {
      start: start.value,
      end: end.value,
      painlevel: painlevel.value,
      symptoms: symptoms,
      triggers: triggers,
      remedies: remedies,
      notes: notes.value,
      faveRemedy: faveRemedy.value
    }
    axios.patch(`${API_URL}/migraines/${updatedMigraine._id}`, newMigraine,  {withCredentials: true})
    .then(() => {
        let cloneMigraines = this.state.migraines.map((migraine) => {
            console.log(migraine._id)
            console.log(updatedMigraine._id)
            if (migraine._id === updatedMigraine._id) {
              migraine = newMigraine 
            }
            return migraine
        })
        console.log('cloneMigraines', cloneMigraines)
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
        console.log(err.response)
        this.setState({
          logInError: err.response.data.error
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

  handleNightmode = () => {
    let body = document.querySelector('body')
    body.classList.contains('nightmode') ? body.classList.remove('nightmode') : body.classList.add('nightmode')
  }


  handleCreateTip = (event) => {
    event.preventDefault()
    const {tipname, tipdescription} = event.currentTarget
    axios.post(`${API_URL}/tips/create`, {
      name: tipname.value,
      description: tipdescription.value
    }, {withCredentials: true})
      .then((res) => {
        let cloneTips = JSON.parse(JSON.stringify(this.state.tips))
        cloneTips.unshift(res.data)
        this.setState({
          tips: cloneTips
        }, () => {this.props.history.push('/recommendations')})
      })
      .catch((err) => {
        this.setState({
          tipFormError: err.response.data.errorMessage
        })
      })
  }


  handleDeleteTip = (id) => {
    axios.delete(`${API_URL}/tips/${id}`, {withCredentials: true})
      .then(() => {
          
        let filteredTips = this.state.tips.filter((tip) => {
          return tip._id !== id
        })

        this.setState({
          tips: filteredTips
        }, () => {
          this.props.history.push('/recommendations')
        })

      })
  }

  handleLikeTip = (id) => {
    axios.patch(`${API_URL}/tips/${id}`, {}, {withCredentials: true})
    .then((updatedTip) => {
        let cloneTips = this.state.tips.map((tip) => {
            if (tip._id === id) {
              tip = updatedTip.data 
            }
            return tip
        })
        this.setState({
          tips: cloneTips
        }, () => {
          this.props.history.push('/recommendations')
        })
    })
  }


  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/migraines/new" render={(routeProps) => {
            return <AddMigraine loggedInUser={this.state.loggedInUser} onSubmit={this.handleCreateMigraine} onLogout={this.handleLogout} onNightmode={this.handleNightmode} errorMessage={this.state.migraineFormError} {...routeProps}/>
          }}  />
          <Route path="/migraines/stats" render={() => {
            return <Stats loggedInUser={this.state.loggedInUser} migraines={this.state.migraines} onNightmode={this.handleNightmode} onLogout={this.handleLogout}/>
          }}  />
          <Route path="/migraines/history" render={() => {
            return <History loggedInUser={this.state.loggedInUser} migraines={this.state.migraines} onNightmode={this.handleNightmode} onLogout={this.handleLogout} onDelete={this.handleDeleteMigraine}/>
          }}  />
          <Route path="/migraines/:id/edit" render={(routeProps) => {
            return <EditMigraine loggedInUser={this.state.loggedInUser} onLogout={this.handleLogout} onNightmode={this.handleNightmode} onEdit={this.handleEditMigraine} {...routeProps}/>
          }}  />
          <Route path="/explore" render={() => {
            return <Media onLogout={this.handleLogout} onNightmode={this.handleNightmode}/>
          }}  />
          <Route path="/recommendations" render={() => {
            return <Recommendations onLogout={this.handleLogout} onNightmode={this.handleNightmode} tips={this.state.tips} loggedInUser={this.state.loggedInUser} onSubmit={this.handleCreateTip} onDelete={this.handleDeleteTip} onLike={this.handleLikeTip}/>
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
