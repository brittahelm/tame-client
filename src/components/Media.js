import React, { Component } from 'react'
import Nav from './Nav'

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
            <div>
                <Nav/>
                <h2>Explore Media</h2>
                <h4>The Guardian</h4>
                {   
                this.state.guardianArticles.filter((i, index) => (index < 3)).map((article, i) => {
                    return (
                        <div key={article+i}>
                            <h5>{article.webTitle}</h5>
                            <a href={article.webUrl} target="_blank" rel="noopener noreferrer">Read more on The Guardian Website</a>
                        </div>
                    )
                })
                }
                <h4>The New York Times</h4>
                {   
                this.state.nytArticles.filter((i, index) => (index < 3)).map((article, i) => {
                    return (
                        <div key={article+i}>
                            <h5>{article.abstract}</h5>
                            <a href={article.web_url} target="_blank" rel="noopener noreferrer">Read more on The New York Times Website</a>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}
