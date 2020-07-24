const fillCalendar = (days) => {
	const container = document.querySelector('.content')

	container.innerHTML = `${Object.keys(days).map(day => `<b>${day}</b>: ${days[day].map(({ couple, shift }) => `${shift}: ${couple[0]}-${couple[1]} | `).join('').slice(0, -2)}<br>`).join('')}`
}

document.querySelector('button').addEventListener('click', async () => {

	// const names = document.querySelector('.names').value.split(', ')
	// const hoursPerShift = document.querySelector('.time').value
	//
	// fillCalendar(getScheduleByNames(names, +hoursPerShift))

	const response = await fetch('http://localhost:5001/aa-justice/us-central1/DeleteDeveloper', {
		method: 'DELETE',
		body: JSON.stringify({
			developerName: 'Roman'
		})
	})
	const data = await response.json()

	console.log(data)

})



//color: rgb(255, 99, 0);
//     background: #212121;
