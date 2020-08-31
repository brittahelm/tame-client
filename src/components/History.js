import React from 'react'
import Nav from './Nav'
import Footer from './NavFooter'
import { Redirect, Link } from 'react-router-dom'

export default function History(props) {
    if(!props.loggedInUser){
        return <Redirect to="/login" />
    }
    return (
        <div className="user-screen">
            <Nav onLogout={props.onLogout}/>
            <h2>History</h2>
            {   
                props.migraines.map((migraine, i) => {
                    return (
                      <div className="history-box" key={migraine + i}>
                        <p>
                          <span>Started at</span>
                          <br></br> {migraine.start.slice(11, 16)} on{" "}
                          {migraine.start.slice(8, 10)}.
                          {migraine.start.slice(5, 7)}.
                          {migraine.start.slice(0, 4)}
                        </p>
                        <p>
                          <span>Ended at</span>
                          <br></br> {migraine.end.slice(11, 16)} on{" "}
                          {migraine.end.slice(8, 10)}.{migraine.end.slice(5, 7)}
                          .{migraine.end.slice(0, 4)}
                        </p><br></br>

                        <p>
                          <span>Pain level: </span>{migraine.painlevel}
                        </p>

                        <div className="history-box-inner">
                          
                            <div className="history-box-inner-group">
                              <p>
                                <span>Symptoms:</span>
                              </p>
                              <ul>
                                {migraine.symptoms.map((symptom, i) => {
                                  return <li key={symptom + 1}>{symptom}</li>;
                                })}
                              </ul>
                            </div>

                            <div className="history-box-inner-group">
                              <p>
                                <span>Triggers:</span>
                              </p>
                              <ul>
                                {migraine.triggers.map((trigger, i) => {
                                  return <li key={trigger + 1}>{trigger}</li>;
                                })}
                              </ul>
                            </div>
                          
                          
                            <div className="history-box-inner-group">
                              <p>
                                <span>Remedies tried:</span>
                              </p>
                              <ul>
                                {migraine.remedies.map((remedy, i) => {
                                  return <li key={remedy + 1}>{remedy}</li>;
                                })}
                              </ul>
                            </div>
                            <p>
                              <span>Remedy that worked best:</span>
                              <br></br> {migraine.faveRemedy}
                            </p>
                          
                        </div>
                        <p>
                          <span>Notes:</span>
                          <br></br> {migraine.notes}
                        </p>
                        <div className="history-buttons">
                        <button
                          className="button"
                          onClick={() => props.onDelete(migraine._id)}
                        >
                          Delete
                        </button>
                        <Link to={`/migraines/${migraine._id}/edit`}>
                          <button className="button">Edit</button>
                        </Link>
                        </div>
                      </div>
                    );
                })
            }
            <Footer/>
        </div>
    )
}