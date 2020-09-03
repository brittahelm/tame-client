import React from 'react'
import Nav from './Nav'
import Footer from './NavFooter'
import { Link } from 'react-router-dom'

import {Doughnut, Pie, Line} from 'react-chartjs-2';



export default class Stats extends React.Component {

	state = {
		triggerData: null,
		symptomData: {},
		timeData: {}
	}

	setTriggerDetails = () => {
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
		let monthlyNums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		let currentDate = new Date();
		let currentMonth = currentDate.getMonth();
		let sortedMonths = months.slice(currentMonth+1).concat(months.slice(0, currentMonth+1))
		


		this.props.migraines.forEach((migraine) => {
			let month;
			migraine.start.slice(5, 6) === '0' ? month = migraine.start.slice(6, 7) : month = migraine.start.slice(5, 7);

			if (migraine.start.slice(0, 10) === migraine.end.slice(0, 10)) {
				monthlyNums[month] = monthlyNums[month] + 1
			}

			else if (migraine.start.slice(0, 7) === migraine.end.slice(0, 7)) {
				let days = migraine.end.slice(8, 10) - migraine.start.slice(8, 10) +1
				monthlyNums[month] = monthlyNums[month] + days;
			}

			else if (migraine.start.slice(0, 5) === migraine.end.slice(0, 5)) {
				
			}

			

		})
		let sortedMonthlyNums = monthlyNums.slice(currentMonth+2).concat(monthlyNums.slice(0, currentMonth+2))

		let timeInfo = {
			labels: sortedMonths,
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
				data: sortedMonthlyNums
			  }
			]
		  }

		
		this.setState({
			triggerData: triggerInfo,
			symptomData: symptomInfo,
			timeData: timeInfo
		})
	}

	componentDidMount() {
		
		if(this.props.migraines.length) {
			this.setTriggerDetails()
		}
		
	}

	componentDidUpdate (newProps) {
		if (this.props.migraines.length  !== newProps.migraines.length) {
			this.setTriggerDetails()
		}
	}

  render() {
	if (!this.state.triggerData){
		return <p>Loading ....</p>
	}

	if(!this.props.migraines.length) {
		return <div className="user-screen">
        <Nav onLogout={this.props.onLogout} onNightmode={this.props.onNightmode}/>
        <h2>Stats</h2>
		<p>No data yet.</p>
		</div>
	}

    return (
      <div className="user-screen">
        <Nav onLogout={this.props.onLogout} onNightmode={this.props.onNightmode}/>
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
