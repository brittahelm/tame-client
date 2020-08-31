import React from 'react';
import axios from 'axios'
import {API_URL} from '../config';
import { Redirect } from 'react-router-dom';
import Nav from './Nav';
import Footer from './NavFooter'


export default class AddMigraine extends React.Component {
  state = {
    possibleSymptoms: [
      "Headache",
      "Nausea",
      "Aura",
      "Light Sensitivity",
      "Sore Throat",
      "Dizziness",
      "Blocked Nose",
      "Anxiety",
      "Fever",
      "Tinnitus",
      "Eye Pain",
      "Blurry Vision",
      "Diarrhea",
    ],
    possibleTriggers: [
      "Stress",
      "Lack of Sleep",
      "Depression",
      "Skipped Meal",
      "Weather Change",
      "High Humidity",
      "Alcohol",
      "Storm",
      "Bright Light",
      "Dehydration",
      "Sinus Problem",
      "Chocolate",
      "Cheese",
    ],
    possibleRemedies: [
      "Rest",
      "Sleep",
      "Yoga",
      "Coolpack",
      "Heatpack",
      "Food",
      "Caffeine",
      "Hot shower/bath",
      "Water",
      "Paracetamol",
      "Aspirin",
      "Ibuprofen",
      "Triptan",
    ],
    migraine: "",
    symptoms: [],
    remedies: [],
    triggers: [],
    startTime: ''
  };

  componentDidMount() {

    if (this.props.onEdit) {
      let id = this.props.match.params.id;
      axios
        .get(`${API_URL}/migraines/${id}`, { withCredentials: true })
        .then((res) => {
          this.setState({
            migraine: res.data,
          });
        });
    }
  }

  checkSymptom = (event) => {
    let box = event.currentTarget.value;
    let cloneSymptoms = this.state.symptoms;
    if (!cloneSymptoms.includes(box)) {
      cloneSymptoms.push(box);
    } else {
      cloneSymptoms.splice(cloneSymptoms.indexOf(box), 1);
    }
    this.setState({
      symptoms: cloneSymptoms,
    });
  };

  checkTrigger = (event) => {
    let box = event.currentTarget.value;
    let cloneTriggers = this.state.triggers;
    if (!cloneTriggers.includes(box)) {
      cloneTriggers.push(box);
    } else {
      cloneTriggers.splice(cloneTriggers.indexOf(box), 1);
    }
    this.setState({
      triggers: cloneTriggers,
    });
  };

  checkRemedy = (event) => {
    let box = event.currentTarget.value;
    let cloneRemedies = this.state.remedies;
    if (!cloneRemedies.includes(box)) {
      cloneRemedies.push(box);
    } else {
      cloneRemedies.splice(cloneRemedies.indexOf(box), 1);
    }
    this.setState({
      remedies: cloneRemedies,
    });
  };

  setStartTime = (event) => {
    this.setState({
      startTime: event.currentTarget.value
    });
  }

  render() {
    if (!this.props.loggedInUser) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="new-migraine-screen user-screen">
        <Nav onLogout={this.props.onLogout} />
        {this.props.onEdit ? (
          <h2>Edit your migraine</h2>
        ) : (
          <div><h2>Record a new migraine</h2><h4>Please provide as much information as possible, at least an estimated start time, pain level and symptoms. You can edit and add to the information later.</h4></div>
        )}

        <form className="new-migraine-form" onSubmit={(e) => this.props.onSubmit(e, this.state.symptoms, this.state.triggers, this.state.remedies)}>

            <label className="new-migraine-question">When did the migraine start?</label>
            <input name="start" type="datetime-local" defaultValue={new Date().toISOString().substring(0, 16)} max={new Date().toISOString().substring(0, 16)} onChange={this.setStartTime}/>


            <label className="new-migraine-question">When did the migraine end?</label>
            <label className="sub-label">Leave empty if migraine hasn't ended yet.</label>
            <input name="end" type="datetime-local" min={this.state.startTime}/>

            
            <label className="new-migraine-question">How bad is the pain?</label>
            <label className="sub-label">On a scale from 1(not too bad) to 5(very bad).</label>
              <div className="radio-inline">
            <div>
            <input
              type="radio"
              name="painlevel"
              id="1"
              value="1"
              defaultChecked={
                this.state.migraine.painlevel === 1 ? true : false
              }
            />
            <label for="1"> 1</label>
            </div>
            <div>
            <input
              type="radio"
              name="painlevel"
              id="2"
              value="2"
              defaultChecked={
                this.state.migraine.painlevel === 2 ? true : false
              }
            />
            <label for="2"> 2</label>
            </div>
            <div>
            <input
              type="radio"
              name="painlevel"
              id="3"
              value="3"
              defaultChecked={
                this.state.migraine.painlevel === 3 ? true : false
              }
            />
            <label for="3"> 3</label>
            </div>
            <div>
            <input
              type="radio"
              name="painlevel"
              id="4"
              value="4"
              defaultChecked={
                this.state.migraine.painlevel === 4 ? true : false
              }
            />
            <label for="4"> 4</label>
            </div>
            <div>
            <input
              type="radio"
              name="painlevel"
              id="5"
              value="5"
              defaultChecked={
                this.state.migraine.painlevel === 5 ? true : false
              }
            />
            <label for="5"> 5</label>
            </div>
            </div>

            <label className="new-migraine-question">What are your symptoms?</label>
            <div className="select-inline">
            {this.state.possibleSymptoms.map((psymp, i) => {
              return (
                <div key={psymp + 1} className="select-option">
                <input
                  onChange={this.checkSymptom}
                  type="checkbox"
                  name="symptoms"
                  id={psymp}
                  value={psymp}
                />
                <label for={psymp}> {psymp}</label>
                </div>
              );
            })}
            </div>

            <label className="new-migraine-question">What may have triggered it?</label>
            <div className="select-inline">
            {this.state.possibleTriggers.map((ptrig, i) => {
              return (
                <div key={ptrig + 1} className="select-option">
                <input
                  onChange={this.checkTrigger}
                  type="checkbox"
                  name="triggers"
                  id={ptrig}
                  value={ptrig}
                />
                <label for={ptrig}> {ptrig}</label>
                </div>
              );
            })}
            </div>

            <label className="new-migraine-question">What remedies have you tried?</label>
            <div className="select-inline">
            {this.state.possibleRemedies.map((prem, i) => {
              return (
                <div key={prem + 1} className="select-option">
                <input
                  onChange={this.checkRemedy}
                  type="checkbox"
                  name="remedies"
                  id={prem}
                  value={prem}
                />
                <label for={prem}> {prem}</label>
                </div>
              );
            })}
            </div>


            <label className="new-migraine-question">Which remedy helped you most?</label>
            <select name="faveRemedy" id="faveRemedy">
              <option value="none">none</option>

              {
                this.state.remedies.map((remedy, i) => {
                  return (
                    <option key={remedy+i} value={remedy}>{remedy}</option>
                  )
                })
              }
            </select>
 


            <label className="new-migraine-question">Notes</label>
            <textarea name="notes" cols="1" rows="5"/>


          {this.props.errorMessage && <p className="auth-error">{this.props.errorMessage}</p>}

          {this.props.onEdit && (
            <button
              className="button"
              onClick={() => this.props.onEdit(this.state.migraine)}
            >
              Edit
            </button>
          )}
          {!this.props.onEdit && (
            <button
              className="button"
              type="submit"
            >
              Submit
            </button>
          )}
        </form>
        <Footer/>
      </div>
    );
  }
}
