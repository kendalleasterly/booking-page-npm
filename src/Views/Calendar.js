import React, { useState, useEffect } from "react"
import "firebase/auth"
import "firebase/firestore"

import { auth, fb, firestore } from "../Global/firebase"
import { bookingSelectedDayAtom } from "../Global/atoms"
import { useRecoilState, useRecoilValue } from "recoil"
import { Link } from "react-router-dom"
import { ReactComponent as BackIconVariable } from "../Images/back-variable.svg"
import { ReactComponent as ForwardIconVariable } from "../Images/forward-variable.svg"

function Calendar(props) {
	const [availableDays, setAvailableDays] = useState({})
	const [allClasses, setAllClasses] = useState([])
	const [selectedDay, setSelectedDay] = useState(new Date().getDate())
	const [month, setMonth] = useState(0)
	const [bookingSelectedDay, setBookingSelectedDay] = useRecoilState(
		bookingSelectedDayAtom
	)
	const monthIndex = new Date().getMonth() + month
	const setSelectedTime = props.setSelectedTime
	const daysArray = ["S", "M", "T", "W", "T", "F", "S"]
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]

	useEffect(() => {
		const now = new Date()

		firestore
			.collection("classes")
			.where("date", ">=", fb.firestore.Timestamp.fromDate(new Date()))
			.get()
			.then((snapshot) => {
				let allClassesArray = []

				snapshot.docs.forEach((doc) => {
					const data = doc.data()

					if (data.attendees.length < 8) {
						
						allClassesArray.push({
							date: data.date.toDate(),
							attendees: data.attendees,
							classType: data.classType
						})
						
					}
				})

				setAllClasses(allClassesArray)
			})
	}, []) //don't touch..?

	useEffect(() => {

		let availableClassesDict = {}

		allClasses.forEach(session => {

			const date = session.date

			if (date.getMonth() === monthIndex) {

				const dayData = availableClassesDict[date.getDate()]

				if (dayData) {
					availableClassesDict[date.getDate()].push(session)
				} else {
					availableClassesDict[date.getDate()] = [session]
				}
			}
		})

		setAvailableDays(availableClassesDict)

	}, [month, allClasses])

	//MARK: This is commented because i am going to put this code into the next button in the infocard.

	// useEffect(() => {
	// 	const selectedDayString = String(selectedDay)
	// 	const date = availableDays[selectedDayString]

	// 	if (date) {
	// 		console.log("the global selelctecd ay is", date)
	// 		setBookingSelectedDay(date)
	// 	}
	// }, [selectedDay])

	const getDays = function () {
		const currentYear = new Date().getFullYear()

		let numOfDays = new Date(currentYear, monthIndex + 1, 0).getDate()

		let dayArray = []

		let i
		for (i = 1; i <= numOfDays; i++) {
			dayArray.push(new Date(currentYear, monthIndex, i))
		}
		return dayArray
	}

	const decideOffset = function () {
		const now = new Date()
		let d = new Date(now.getFullYear(), monthIndex, 1)
		let offset = d.getDay()

		let offsetArray = []
		let i
		for (i = 0; i < offset; i++) {
			offsetArray.push(i)
		}

		return offsetArray
	}

	return (
		<div className="font-bold text-xl space-y-8 ">
			<div className="flex w-full max-w-sm lg:max-w-md mx-auto">
				<button onClick={() => setMonth(0)}>
					<BackIconVariable fill={month === 0 ? "#E4E4E7" : "#3B82F6"} />
				</button>

				<p className="flex-grow text-center text-blue-500">
					{months[monthIndex]}
				</p>
				<button onClick={() => setMonth(1)}>
					<ForwardIconVariable fill={month === 0 ? "#3B82F6" : "#E4E4E7"} />
				</button>
			</div>

			<div className="card grid gap-7 grid-cols-7 text-center text-blue-500 ">
				{daysArray.map((element, key) => (
					<p key={key} className="text-gray-700 text-center">
						{element}
					</p>
				))}

				{decideOffset().map((element, key) => (
					<p key={key}></p>
				))}

				{getDays().map((element, key) => (
					<Day day={element} key={key} selectedTime={props.selectedTime} />
				))}
			</div>

			<InfoCard />
		</div>
	)

	function Day(props) {
		let enabled = false
		const dayOfMonth = props.day.getDate()

		function decideStyling() {
			const availableDaysKeys = Object.keys(availableDays)
			const dayOfMonthString = String(dayOfMonth)
			let styling = "font-bold w-8 h-8 text-center "

			if (selectedDay === dayOfMonth) {
				styling = "text-white font-bold w-8 h-8 rounded-full text-center "

				if (availableDaysKeys.includes(dayOfMonthString)) {
					enabled = true
					styling = styling + "bg-blue-500"
				} else {
					styling = styling + "bg-gray-300"
				}
			} else if (availableDaysKeys.includes(dayOfMonthString)) {
				enabled = true
				styling = styling + "text-blue-500"
			} else {
				styling = styling + "text-gray-300"
			}

			return styling
		}

		function changeSelectedDay() {
			setSelectedDay(dayOfMonth)
		}

		if (enabled) {
			return (
				<button onClick={changeSelectedDay} className={decideStyling()}>
					{dayOfMonth}
				</button>
			)
		} else {
			return (
				<button
					onClick={changeSelectedDay}
					className={decideStyling()}
					disabled={!enabled}
				>
					{dayOfMonth}
				</button>
			)
		}
	}

	function InfoCard() {
		let element = (
			<p className="w-full text-center font-normal text-gray-400">
				Sorry, there are no classes for this day. Please select an available
				day.
			</p>
		)

		let account = props.account

		const formatTime = function (time) {
			let hour = time.getHours()
			const minute = time.getMinutes()

			if (hour < 12) {
				if (minute != 0) {
					return `${hour}:${minute} AM`
				} else {
					return `${hour} AM`
				}
			} else {
				hour -= 12

				if (minute != 0) {
					return `${hour}:${minute} PM`
				} else {
					return `${hour} PM`
				}
			}
		}

		const decideNextStep = function () {
			if (account) {
				if (account.freeClasses > 0 || account.isMember) {
					return "/book/usefreeclasses"
				} else {
					return "/book/payment"
				}
			} else {
				return "/book/"
			}
		}

		function setGlobalSelectedDay(date) {
			console.log("the invocation of this function includes", date)

			setBookingSelectedDay(date)
		}

		function getAttendees(session) {


			const attendees = session.attendees

			let attendeesString = ""

			if (attendees.length === 0) {
				attendeesString = "None yet, be the first!"
			} else if (attendees.length === 1) {
				attendeesString = attendees[0].name
			} else {
				attendees.forEach(attendee => {

					if (attendees[0].id !== attendee.id) {

						attendeesString = `${attendeesString}, ${attendee.name}`

					} else {
						attendeesString = attendee.name
					}
				})
			}

			

			return attendeesString
		}

		function getClassType(session) {

			switch (session.classType) {
				case "adult":
					return "For adults"
				case "kid":
					return "For kids"
				default:
					return "For adults"
			}
		}

		let availableDaysKeys = Object.keys(availableDays)
		let selectedDayString = selectedDay + ""

		if (availableDaysKeys.includes(selectedDayString)) {
			let sessions = availableDays[selectedDayString]
			const monthSymbol = months[sessions[0].date.getMonth()]

			element = (
				<div className="space-y-8">
					{sessions.map((session, key) => {
						return (
							<div className="card text-left text-gray-900 space-y-4" key={key}>
								<p className="float-right text-lg font-normal text-gray-400">
									{monthSymbol} {selectedDay}
								</p>

								<div>
									<p className="text-lg text-gray-400">Time</p>
									<p>{formatTime(session.date)}</p>
								</div>

								<div>
									<p className="text-lg text-gray-400">Price</p>
									<p className="mb-5">$15.00</p>
								</div>

								<div>
									<p className="text-lg text-gray-400">Type</p>
									<p className="mb-5">{getClassType(session)}</p>
								</div>

								<div>
									<p className="text-lg text-gray-400">Attendees</p>
									<p className="mb-5">{getAttendees(session)}</p>
								</div>

								<Link to={`${decideNextStep()}/${session.date.getTime()}/${session.classType}`}>
									<p
										className="font-bold rounded-3xl bg-blue-500 text-center text-white w-full py-1.5"
										onClick={() => setGlobalSelectedDay(session.date)}
									>
										Next
									</p>
								</Link>
							</div>
						)
					})}
				</div>
			)
		}

		return element
	}
}

export default Calendar
