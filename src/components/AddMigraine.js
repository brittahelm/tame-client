import React from 'react';
import axios from 'axios'
import {API_URL} from '../config';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Nav from './Nav'


export default class AddMigraine extends React.Component {
  state = {
    possibleSymptoms: [
      "headache",
      "nausea",
      "aura",
      "light sensitivity",
      "sore throat",
      "dizziness",
      "blocked nose",
      "anxiety",
      "fever",
      "tinnitus",
      "eye pain",
      "blurry vision",
      "diarrhea",
    ],
    possibleTriggers: [
      "stress",
      "lack of sleep",
      "depresion",
      "skipped meal",
      "weather change",
      "high humidity",
      "alcohol",
      "storm",
      "bright light",
      "dehydration",
      "sinus problem",
      "chocolate",
      "cheese",
    ],
    possibleRemedies: [
      "rest",
      "sleep",
      "yoga",
      "coolpack",
      "heatpack",
      "food",
      "caffeine",
      "hot shower/bath",
      "water",
      "paracetamol",
      "aspirin",
      "ibuprofen",
      "triptan",
    ],
    migraine: "",
    symptoms: [],
    remedies: [],
    triggers: [],
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

  render() {
    if (!this.props.loggedInUser) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <Nav onLogout={this.props.onLogout} />
        {this.props.onEdit ? (
          <h2>Edit your migraine</h2>
        ) : (
          <h2>Record a new migraine</h2>
        )}

        <Form onSubmit={(e) => this.props.onSubmit(e, this.state.symptoms, this.state.triggers, this.state.remedies)}>
          <Form.Group controlId="formStartTime">
            <Form.Label>When did the migraine start?</Form.Label>
            <Form.Control name="start" type="datetime-local" />
          </Form.Group>
          <Form.Group controlId="formEndTime">
            <Form.Label>When did the migraine end?</Form.Label>
            <Form.Control name="end" type="datetime-local" />
          </Form.Group>
          <Form.Group controlId="formPainLevel">
            <Form.Label>How bad is the pain?</Form.Label>
            <Form.Check
              inline
              type="radio"
              name="painlevel"
              id="1"
              value="1"
              label="1"
              defaultChecked={
                this.state.migraine.painlevel === 1 ? true : false
              }
            />
            <Form.Check
              inline
              type="radio"
              name="painlevel"
              id="2"
              value="2"
              label="2"
              defaultChecked={
                this.state.migraine.painlevel === 2 ? true : false
              }
            />
            <Form.Check
              inline
              type="radio"
              name="painlevel"
              id="3"
              value="3"
              label="3"
              defaultChecked={
                this.state.migraine.painlevel === 3 ? true : false
              }
            />
            <Form.Check
              inline
              type="radio"
              name="painlevel"
              id="4"
              value="4"
              label="4"
              defaultChecked={
                this.state.migraine.painlevel === 4 ? true : false
              }
            />
            <Form.Check
              inline
              type="radio"
              name="painlevel"
              id="5"
              value="5"
              label="5"
              defaultChecked={
                this.state.migraine.painlevel === 5 ? true : false
              }
            />
          </Form.Group>
          <Form.Group controlId="formSymptoms">
            <Form.Label>What are your symptoms?</Form.Label>

            {this.state.possibleSymptoms.map((psymp, i) => {
              return (
                <Form.Check
                  onChange={this.checkSymptom}
                  type="checkbox"
                  name="symptoms"
                  id={psymp}
                  key={psymp + 1}
                  value={psymp}
                  label={psymp}
                />
              );
            })}
          </Form.Group>
          <Form.Group controlId="formTriggers">
            <Form.Label>What may have triggered it?</Form.Label>
            {this.state.possibleTriggers.map((ptrig, i) => {
              return (
                <Form.Check
                  onChange={this.checkTrigger}
                  type="checkbox"
                  name="triggers"
                  id={ptrig}
                  key={ptrig + 1}
                  value={ptrig}
                  label={ptrig}
                />
              );
            })}
          </Form.Group>
          <Form.Group controlId="formRemedies">
            <Form.Label>What remedies have you tried?</Form.Label>

            {this.state.possibleRemedies.map((prem, i) => {
              return (
                <Form.Check
                  onChange={this.checkRemedy}
                  type="checkbox"
                  name="remedies"
                  id={prem}
                  key={prem + 1}
                  value={prem}
                  label={prem}
                />
              );
            })}
          </Form.Group>

          <Form.Group controlId="formRemedySelect">
            <Form.Label>Which remedy helped you most?</Form.Label>
            <Form.Control as="select" custom>
              <option>none</option>

              {
                this.state.remedies.map((remedy, i) => {
                  return (
                    <option key={remedy+i}>{remedy}</option>
                  )
                })
              }
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formMigraineNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control name="notes" type="text" />
          </Form.Group>

          

          {this.props.onEdit && (
            <Button
              onClick={() => this.props.onEdit(this.state.migraine)}
              variant="outline-dark"
            >
              Edit
            </Button>
          )}
          {!this.props.onEdit && (
            <Button
              variant="outline-dark"
              type="submit"
            >
              Submit
            </Button>
          )}
        </Form>
      </div>
    );
  }
}
