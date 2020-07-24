exports.createAWeek = functions.https.onRequest(async (_, response) => {
	try {
		const storage = app.firestore();
		const collection = await storage.collection('schedule')
		collection.add({
			week: [
				{
					couple: ['H', 'V'],
					dayName: 'Mon',
					shift: 1
				}
			],
			timestamp: +new Date
		})
		response.send()
	} catch (e) {
		response(e)
	}
})

export const postWeek = async (response, storage) => {
	try {
		const collection = await storage.collection('schedule')
		collection.add({
			week: [
				{
					couple: ['H', 'V'],
					dayName: 'Mon',
					shift: 1
				}
			],
			timestamp: +new Date
		})
		response.send()
	} catch (e) {
		response(e)
	}
}
