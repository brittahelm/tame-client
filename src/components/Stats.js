import React from 'react'
import Nav from './Nav'
import Footer from './NavFooter'
import { Link } from 'react-router-dom'

import {Doughnut, Pie, Line} from 'react-chartjs-2';



export default class Stats extends React.Component {

	state = {
		triggerData: null,
		symptomData: {},
		timeData: {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [
			  {
				label: 'Migraine days each month',
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: 'rgba(75,192,192,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(75,192,192,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [65, 59, 80, 81, 56, 55, 40]
			  }
			]
		  }
	}


	componentDidMount() {
		let triggerStats= {}
		this.props.migraines.forEach((migraine) => {
			
			migraine.triggers.forEach((trigger) => {
				
				if (!(trigger in triggerStats)) {
					triggerStats[trigger] = 1;
				}
				else {
					triggerStats[trigger] = triggerStats[trigger] +1
				}
			})
		})
		let triggerLabels = Object.keys(triggerStats);
		let triggerNums = Object.values(triggerStats);
		let triggerInfo = {
			labels: triggerLabels,
			datasets: [{
				data: triggerNums,
				backgroundColor: [
				'#FF6384',
				'#36A2EB',
				'#FFCE56',
				'#9ec76b',
				'#d27fd4',
				'#7f8cd4',
				'#f58936',
				'#92e1e8',
				'#ffff8f',
				'#4049ff',
				'#adffc9',
				'#ffadbc',
				'#7a9465'
				],
				hoverBackgroundColor: [
				'#FF6384',
				'#36A2EB',
				'#FFCE56',
				'#9ec76b',
				'#d27fd4',
				'#7f8cd4',
				'#f58936',
				'#92e1e8',
				'#ffff8f',
				'#4049ff',
				'#adffc9',
				'#ffadbc',
				'#7a9465'
				]
			}]
		}

		let symptomStats= {}
		this.props.migraines.forEach((migraine) => {
			
			migraine.symptoms.forEach((symptom) => {
				
				if (!(symptom in symptomStats)) {
					symptomStats[symptom] = 1;
				}
				else {
					symptomStats[symptom] = symptomStats[symptom] +1
				}
			})
		})
		let symptomLabels = Object.keys(symptomStats);
		let symptomNums = Object.values(symptomStats);
		let symptomInfo = {
			labels: symptomLabels,
			datasets: [{
				data: symptomNums,
				backgroundColor: [
				'#FF6384',
				'#36A2EB',
				'#FFCE56',
				'#9ec76b',
				'#d27fd4',
				'#7f8cd4',
				'#f58936',
				'#92e1e8',
				'#ffff8f',
				'#4049ff',
				'#adffc9',
				'#ffadbc',
				'#7a9465'
				],
				hoverBackgroundColor: [
				'#FF6384',
				'#36A2EB',
				'#FFCE56',
				'#9ec76b',
				'#d27fd4',
				'#7f8cd4',
				'#f58936',
				'#92e1e8',
				'#ffff8f',
				'#4049ff',
				'#adffc9',
				'#ffadbc',
				'#7a9465'
				]
			}]
		}

		let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		let currentDate = new Date();
		let currentMonth = currentDate.getMonth();
		let sortedMonths = months.slice(currentMonth+1).concat(months.slice(0, currentMonth+1))
		
		
		this.setState({
			triggerData: triggerInfo,
			symptomData: symptomInfo
		})
	}

  render() {
	console.log('INSIDE RENDER', this.state.triggerData)
	// if (!this.state.triggerData){
	// 	// return <p>Loading ....</p>
	// }

    return (
      <div className="user-screen">
        <Nav onLogout={this.props.onLogout} />
        <h2>Stats</h2>
		<div className="stats-graph">
          <h3>Your migraines this year</h3>
          <Line data={this.state.timeData} />
        </div>
        <div className="stats-graph">
          <h3>Your most common triggers</h3>
          <Doughnut data={this.state.triggerData} />
        </div>
		<div className="stats-graph">
          <h3>Your most common symptoms</h3>
		  <Pie data={this.state.symptomData}/>
        </div>
        <Link to="/migraines/history">
          <button className="button">See History</button>
        </Link>
        <Footer />
      </div>
    );
  }
}
