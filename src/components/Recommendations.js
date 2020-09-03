import React from 'react'
import Nav from './Nav'
import Footer from './NavFooter'

export default function Recommendations(props) {
    return (
        <div>
            <Nav onLogout={props.onLogout} onNightmode={this.onNightmode}/>
            <h2>Explore user recommendations</h2>
            <Footer/>
        </div>
    )
}
