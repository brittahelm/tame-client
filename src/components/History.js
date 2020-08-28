import React from 'react'
import Nav from './Nav'
import { Button } from 'bootstrap-react'
import { Link, Redirect } from 'react-router-dom'

export default function History(props) {
    if(!props.loggedInUser){
        return <Redirect to="/login" />
    }
    return (
        <div>
            <Nav onLogout={props.onLogout}/>
            <h2>History</h2>
            {   
                props.migraines.map((migraine, i) => {
                    return (
                        <div key={migraine+i}>
                            <p>{migraine.start}</p>
                            <p>{migraine.end}</p>
                            <p>Symptoms: {migraine.symptoms}</p>
                            <p>Triggers: {migraine.triggers}</p>
                            <p>Remedies tried: {migraine.remedies}</p>
                            <p>Remedy that worked best: {migraine.faveRemedy}</p>
                            <p>Notes: {migraine.notes}</p>
                            <Button variant="outline-dark" onClick={() => props.onDelete(migraine._id)}>Delete</Button>
                            <Link to={`/migraines/${migraine._id}/edit`}><Button variant="outline-dark">Edit</Button></Link>
                        </div>
                    )
                })
            }
        </div>
    )
}