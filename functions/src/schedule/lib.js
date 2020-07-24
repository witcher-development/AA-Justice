const DAYS_NUMBER = 5
const HOURS_IN_DAY = 8
const WORK_HOURS = 8
const HOURS_IN_WEEK = DAYS_NUMBER * HOURS_IN_DAY
const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

export const getScheduleByNames = (names, hoursPerShift) => {
	let couples = []

	// Creates couples
	names.forEach((name, index) => {
		names.slice(index + 1).forEach(partner => couples.push([name, partner]))
	})

	// Shuffle couples
	const shuffle = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * i)
			const temp = array[i]
			array[i] = array[j]
			array[j] = temp
		}
	}
	shuffle(couples)

	const shitsPerCouple = WORK_HOURS / hoursPerShift
	const slotsPerWeek = HOURS_IN_WEEK / hoursPerShift
	const shiftsNumber = shitsPerCouple * couples.length

	const shifts = Array(shiftsNumber).fill(null).map((_, i) => ({
		couple: i % couples.length + 1,
		day: Math.floor((DAYS_NUMBER * i + DAYS_NUMBER - 1) / slotsPerWeek)
	}))

	let days = []

	shifts.forEach(({ day, couple}, shift) => {
		const dayName = DAY_NAMES[day]

		if (!days[dayName]) days[dayName] = []

		days[dayName].push({
			couple: couples[couple - 1],
			shift,
		})
	})

	return days
}
