import React from 'react'
import axios from 'axios';
import {API_URL} from '../config';
import { Redirect } from 'react-router-dom';
import Nav from './Nav'
import Footer from './NavFooter'

export default class Recommendations extends React.Component {

    state = {
        loggedInUser: this.props.loggedInUser
    }

    componentDidMount(){
        if (!this.state.loggedInUser) {
          axios.get(`${API_URL}/user`, {withCredentials: true})
            .then((res) => {
                this.setState({
                  loggedInUser: res.data
                })
            })
            .catch(() =>{
              return <Redirect to="/login" />
            })
        }
      }
    
    //   componentDidUpdate (newProps) {
    //         if (this.state.loggedInUser._id  !== newProps.loggedInUser._id) {
    //             axios.get(`${API_URL}/user`, {withCredentials: true})
    //         .then((res) => {
    //             this.setState({
    //               loggedInUser: res.data
    //             })
    //         })
    //         .catch(() =>{
    //           return <Redirect to="/login" />
    //         })
    //         }
    //     }

    handleSubmit = (event) => {
        this.props.onSubmit(event)
        let tipname = document.getElementById('tipname')
        tipname.value= '';
        let tipdescription = document.getElementById('tipdescription')
        tipdescription.value= '';
    }

    render() {
    return (
        <div className="user-screen">
            <Nav onLogout={this.props.onLogout} onNightmode={this.props.onNightmode}/>
            <h2>Community tips</h2>
            <div className="tip-box-outer">
            <div className="tip-box-inner">
            <form className="new-migraine-form" onSubmit={this.handleSubmit}>
                <label className="new-migraine-question" htmlFor="tip-name">What helps me</label>
                <input id="tipname" name="tipname" type="text"/>
                <label className="new-migraine-question" htmlFor="tip-description">Description</label>
                <textarea id="tipdescription" name="tipdescription" cols="1" rows="3" type="text"/>
                <button className="button" type="submit">Add tip</button>
            </form>
            </div>
            <div className="tip-box-inner tip-box-list">
                    {
                        this.props.tips.map((tip, i) => {
                            return (
                                <article key={tip + i}>
                                    <h4>{tip.name}</h4>
                                    <p>{tip.description} (Rating: {tip.rating})</p>
                                    
                                    {this.state.loggedInUser._id === tip.userID ? <button onClick={() => this.props.onDelete(tip._id)} className="tip-button button">Delete</button> : <button className="tip-button tip-like-button button" onClick={() => this.props.onLike(tip._id)}>Like</button>}
                                    
                                </article>
                            )
                        })
                    }
            </div>
            </div>
            <Footer/>
        </div>
    )
}
}
