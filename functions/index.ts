import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { postWeek } from './src/schedule'

const app = admin.initializeApp({
	credential: admin.credential.cert(require('../keys.json'))
});

export const createAWeek = functions.https.onRequest(async (_, response) => {
	try {
		const storage = app.firestore();
		response.status(200).send(await postWeek(response, storage))
	} catch (e) {
		response.status(500).send(e)
	}
})

export const GetTheLastWeek = functions.https.onRequest(async (_, response) => {
	try {
		const storage = app.firestore();

		response.set('Access-Control-Allow-Origin', '*')

		const collection = (await storage.collection('schedule')
			.orderBy('timestamp', 'desc')
			.limit(1)
			.get())
			.forEach(doc => response.status(200).send(doc.data()))

	} catch (e) {
		response.send(e)
	}
});

export const PostDeveloper = functions.https.onRequest(async (request, response) => {
	try {
		const storage = app.firestore();

		response.set('Access-Control-Allow-Origin', '*')

		const data = JSON.parse(request.body)

		const developer = await storage.collection('developers').add({
			name: data.developerName
		})

		response.send((await developer.get()).data())
	} catch (e) {
		response.send(e)
	}
})

export const GetDevelopers = functions.https.onRequest(async (_, response) => {
	try {
		const storage = app.firestore();

		response.set('Access-Control-Allow-Origin', '*')

		const developerRefs = await storage.collection('developers').listDocuments()
		const developers = await Promise.all([...developerRefs.map(dev => dev.get())])

		response.send(developers.map(dev => dev.data()))
	} catch (e) {
		response.send(e)
	}
})

export const DeleteDeveloper = functions.https.onRequest(async (request, response) => {
	try {
		const storage = app.firestore();

		response.set('Access-Control-Allow-Origin', '*')
		response.set('Access-Control-Allow-Methods', '*')

		const data = JSON.parse(request.body);

		(await storage.collection('developers')
			.where('name', '==', data.developerName)
			.get())
			.forEach(doc => {
				doc.ref.delete()
			});

		response.send()
	} catch (e) {
		response.send(e)
	}
})


// '45 23 * * 0'
// exports.scheduledFunction = functions.pubsub.schedule('10 * * * *').onRun((context) => {
// 	console.log('This will be run every 5 minutes!');
// 	return null;
// });
