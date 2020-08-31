import React, { Component } from 'react'
import Nav from './Nav'
import Footer from './NavFooter'

const axios = require('axios');

export default class Media extends Component {

    state = {
        guardianArticles : [],
        nytArticles: []
    }

    componentDidMount(){
        axios.get(`https://content.guardianapis.com/search?q=migraine&api-key=${process.env.REACT_APP_GUARDIANKEY}`)
          .then((res) => {
              this.setState({
                guardianArticles: res.data.response.results
              })
          })
          axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=migraine&api-key=${process.env.REACT_APP_NYTKEY}`)
            .then((res) => {
                this.setState({
                    nytArticles: res.data.response.docs
                })
            })
      }

    render() {
        return (
            <div className="user-screen">
                <Nav onLogout={this.props.onLogout}/>
                <h2>Explore Media</h2>
                <div className="media-box">
                <h4>The Guardian</h4>
                {   
                this.state.guardianArticles.filter((i, index) => (index < 3)).map((article, i) => {
                    return (
                        <div className="media-box-inner" key={article+i}>
                            <h5>{article.webTitle}</h5>
                            <a href={article.webUrl} target="_blank" rel="noopener noreferrer">Read more on The Guardian Website</a>
                            <i class="far fa-bookmark"></i>
                        </div>
                    )
                })
                }
                </div>
                <div className="media-box">
                <h4>The New York Times</h4>
                {   
                this.state.nytArticles.filter((i, index) => (index < 3)).map((article, i) => {
                    return (
                        <div className="media-box-inner" key={article+i}>
                            <h5>{article.abstract}</h5>
                            <a href={article.web_url} target="_blank" rel="noopener noreferrer">Read more on The New York Times Website</a>
                            <i class="far fa-bookmark"></i>
                            <i class="fas fa-bookmark"></i>
                        </div>
                    )
                })
                }
                </div>
                <Footer/>
            </div>
        )
    }
}
