/* global data */

/**
* Treehouse Techdegree: Adam Allen
* FSJS Project 2 - Data Pagination and Filtering
**/

/**
* This function will create and insert/append the elements needed to display a
* "page" of nine students
**/

const studentsPerPage = 9
const linkList = document.querySelector('ul.link-list')
const header = document.querySelector('header')
const studentList = document.querySelector('ul.student-list')
let displayedStudents = Array.from(data) // shows only students that should be displayed in the app

const searchBar = `
   <label for="search" class="student-search">
   <input id="search" placeholder="Search by name...">
   <button class="search-button" type="button"><img src="img/icn-search.svg"
       alt="Search icon"></button>
   </label>
   `
header.insertAdjacentHTML('beforeend', searchBar)

/**
 * iterates through an array and displays a maximum of 9 students per page
 *
 * @param {*}  list  the array that gets passed in to the function (data)
 * @param {*}  page  the current page displayed
 */

function showPage (list, page) {
  const startIndex = (page * studentsPerPage) - studentsPerPage
  const endIndex = page * studentsPerPage
  studentList.innerHTML = ''

  if (list.length > 0) {
    for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
        studentList.insertAdjacentHTML('beforeend', `
               <li class="student-item cf">
               <div class="student-details">
               <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
               <h3>${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
               </div>
               </li>
               `)
      }
    }
  } else {
    studentList.insertAdjacentHTML('beforeend', '<li>No results found</li>')
  }
}

/**
* This function will create and insert the elements needed for the pagination buttons
**/

function addPagination (list) {
  const numOfPages = Math.ceil(list.length / studentsPerPage)
  linkList.innerHTML = ''

  for (let i = 1; i <= numOfPages; i++) {
    const button = `<li>
                           <button type="button">${i}</button>
                        </li>`
    linkList.insertAdjacentHTML('beforeend', button)
    document.querySelector('li button').className = 'active'
  }
}

showPage(displayedStudents, 1)
addPagination(displayedStudents)

const searchInput = document.querySelector('#search')
// const searchButton = document.querySelector('.search-button') !--fix this
// add an event listener for the search button

/**
 * Event listener that allows clicks to a page button and adds specific
 * styling to the active page button
 */

linkList.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    document.querySelector('.active').className = ''
    e.target.className = 'active'
    showPage(displayedStudents, e.target.textContent)
  }
})

/**
 *  Event listener that searches through the data set on the release of each key to find
 *  matching names. If the names match, only the matching students display on the page.
 *  The page numbers update to align with the amount of students matched
 */

searchInput.addEventListener('keyup', (e) => {
  e.preventDefault()
  const searchText = e.target.value.toLowerCase()
  displayedStudents = [] // resetting array every time a search is performed

  for (let i = 0; i < data.length; i++) {
    const fullName = (data[i].name.first + ' ' + data[i].name.last).toLowerCase()

    if (fullName.includes(searchText)) { // always return true if search is blank ('')
      displayedStudents.push(data[i])
    }
  }
  showPage(displayedStudents, 1)
  addPagination(displayedStudents)
})
