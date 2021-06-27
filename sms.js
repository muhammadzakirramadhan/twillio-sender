'use strict';
require('dotenv').config()
const fs = require('fs')
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const from = process.env.FROM
const readline = require("readline")
const client = require('twilio')(accountSid, authToken)
const c = require("cli-color")

// color here

const green = c.green
const red = c.red
const cyan = c.cyan
const yellow = c.yellow

const sendSms = async(client, number, message) => {
	try {
		const send = await client.messages.create({
			body: message,
			from: from,
			to: number
		})

		if (send.sid) {
			console.log(green(`Sent : ${number}`))
		} else {
			console.log(red(`Failed: ${number}`))
		}
	} catch (error){
		onError(error)
	}
}

const onError = (error) => {
	console.log(error)
	return 1
}

const runApp = async(client) => {
	console.log(cyan('Twillio Sender - Code By ZakirDotID\n'))

	const list = process.env.LIST
	const text = process.env.MESSAGE

	console.log(`Loaded List ${list}\n`)

	try{
		const numberList = fs.readFileSync(list, 'utf8')
		const message = fs.readFileSync(text, 'utf8')
		const numbers = numberList.split("\r\n")

		console.log(yellow("------------------ Sending Start -------------------"))
		await numbers.map((number) => {
			sendSms(client, number, message)
		})

	} catch (err) {
		onError(err)
	}
}

runApp(client)