const reviewForm = document.querySelector('#reviewForm');
const title = document.querySelector('#title');
const year = document.querySelector('#year');
const review = document.querySelector('#review');
const display = document.querySelector('#display pre');
const retrieveBtn = document.querySelector('#retrieveBtn');
const reviewsTable = document.querySelector('#reviewsTable');
const titleError = document.querySelector('#titleError');
const yearError = document.querySelector('#yearError');
const reviewError = document.querySelector('#reviewError');
const removeForm = document.querySelector('#removeForm');
const removeID = document.querySelector('#removeID');
const removeBtn = document.querySelector('#removeBtn');
const movieReview = [];




const validateTitle = () => {
    const titleValue = title.value.trim();


    const titleValidator = /^[\s\S\w\WA-a-zZ0-9]{2,46}$/
    titleError.innerText = "";


    if (!titleValue) {
        titleError.innerText = 'Title field is required';

    }

    else if (titleValue.length < 2 || titleValue.length > 46) {
        titleError.innerText = 'Title field must be between 2 to 46 characters';
    }

}

const validateYear = () => {
    const yearValue = year.value.trim();
    const currentYear = new Date().getFullYear();

    const yearValidator = /^[0-9]{4}$/
    yearError.innerText = "";


    if (!yearValue) {
        yearError.innerText = 'Year field is required';

    }

    else if (!yearValidator.test(yearValue) || yearValue.length < 4 || yearValue.length > 4 || yearValue < 1874 || yearValue > currentYear) {
        yearError.innerText = 'Year field must be 4 numbers and must be a true events that exist after year 1873';

        /* Passage de Venus - is an 1874 black-and-white silent short film and considered as a movie that only runs for a couple seconds. It is the only movie by Frenchman P.J.C. Janssen.
        
        (https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c9/1874_Pierre_Jules_C%C3%A9sar_Janssen_-_Passage_de_Venus.webm/1874_Pierre_Jules_C%C3%A9sar_Janssen_-_Passage_de_Venus.webm.360p.webm)
        
        “The Horse In Motion” -  
            oldest film, It formed an important step in the development that leads to the creation of true motion picture cameras for years to come. 
        
            The first unpublished attempt was on 1873 and */
    }


}


// // Validate title field


// // Validate year field
// if (!year.innerText.match(/\S/)) {
//     alert("Year field is required");
//     return;
// }

// //Validate year field is number
// if (!year.innerText.match(/^\d+$/)) {
//     alert("Year field must be a number")
//     return;
// }

// // Validate review field
// if (!review.innerText.match(/\S/)) {
//     alert("Review field is required");
//     return;
// }







let movieReviews = JSON.parse(localStorage.getItem("Movie Reviews")) || []

reviewForm.addEventListener(
    'submit',
    (e) => {
        e.preventDefault();
        let isValid = true;
        validateTitle();
        validateYear();


        if (titleError.innerText !== "" || yearError.innerText !== "") {
            isValid = false;
        }
        if (isValid) {



            const movieReview = {
                id: Date.now(),
                title: title.value,
                year: year.value,
                review: review.value

            }
            // find the index of the review with the same title and year
            const reviewIndex = movieReviews.findIndex((review) => review.title === movieReview.title && review.year === movieReview.year);
            if (reviewIndex !== -1) {
                // update the review at the found index
                movieReviews.splice(reviewIndex, 1, movieReview);
            } else {
                // add the new review to the movieReviews array
                movieReviews.push(movieReview);
            }
            // update Local Storage with the updated movieReviews array
            localStorage.setItem("Movie Reviews", JSON.stringify(movieReviews));
            // re-render the reviewsTable
            retrieveBtn.click();

            reviewForm.reset();
        }
    }



);


retrieveBtn.addEventListener(
    'click',
    () => {
        // retrieve movie reviews from local storage
        const reviews = JSON.parse(localStorage.getItem("Movie Reviews"))

        if (reviews && reviews.length > 0) {
            if (retrieveBtn.innerText === 'Show Local Storage') {
                retrieveBtn.innerText = 'Hide Local Storage';

                // Clear the table if it already has rows
                while (reviewsTable.rows.length > 1) {
                    reviewsTable.deleteRow(1);
                }

                for (let review of reviews) {
                    // create a new table row
                    const row = reviewsTable.insertRow();

                    // create cells inside new table row
                    const idCell = row.insertCell(0);
                    const titleCell = row.insertCell(1);
                    const yearCell = row.insertCell(2);
                    const reviewCell = row.insertCell(3);

                    // insert values to the table cells
                    idCell.innerText = review.id;
                    titleCell.innerText = review.title;
                    yearCell.innerText = review.year;
                    reviewCell.innerText = review.review;
                }
            } else {
                retrieveBtn.innerText = 'Show Local Storage';

                // Clear the table if it already has rows
                while (reviewsTable.rows.length > 1) {
                    reviewsTable.deleteRow(1);
                }
            }
        } else {
            retrieveBtn.innerText = 'Local Storage is Empty :(';
        }
    }
)



// create / insert a new table row (either create or insert)

// create / insert cells inside new table row (append)

// insert values to the table cells (check reviewsTable)

/* ========================================================= */

// Solution 1
// const row = reviewsTable.insertRow();

// row.innerText = `<td>${review.id}</td>
//               <td>${review.title}</td>
//               <td>${review.year}</td>
//               <td>${review.review}</td>`;

/* ========================================================= */

// Solution 2


// create a new table row and cells using string template literals
// const row = `<tr><td>${review.id}</td><td>${review.title}</td><td>${review.year}</td><td>${review.review}</td></tr>`;

// insert the row into the table using the insertAdjacentHTML() method
// reviewsTable.insertAdjacentHTML("beforeend", row);

/* ================================================================ */


// Solution 3.1

// const row = document.createElement("tr");

// // insert the review's id, title, year, and review into the appropriate cells
// const idCell = document.createElement("td");
// idCell.textContent = review.id;

// const titleCell = document.createElement("td");
// titleCell.textContent = review.title;

// const yearCell = document.createElement("td");
// yearCell.textContent = review.year;

// const reviewCell = document.createElement("td");
// reviewCell.textContent = review.review;

// // Append the cells to the row
// row.appendChild(idCell);
// row.appendChild(titleCell);
// row.appendChild(yearCell);
// row.appendChild(reviewCell);

/* Solution 3.2 add -->  fragment.appendChild(row);

// // Append the row to the table
// reviewsTable.appendChild(row);

/* ================================================================== */

// Solution 4

// const row = document.createElement("tr");

// // create cells
// const idCell = document.createElement("td");
// idCell.textContent = review.id;

// const titleCell = document.createElement("td");
// titleCell.textContent = review.title;

// const yearCell = document.createElement("td");
// yearCell.textContent = review.year;

// const reviewCell = document.createElement("td");
// reviewCell.textContent = review.review;


// // insert the cells into the row using the insertAdjacentElement() method
// //insertAdjacentElement --> inserts a given element node at a given position relative to the element it is invoked upon
// // beforeend --> Before the end of the element (last child)

// row.insertAdjacentElement("beforeend", idCell);
// row.insertAdjacentElement("beforeend", titleCell);
// row.insertAdjacentElement("beforeend", yearCell);
// row.insertAdjacentElement("beforeend", reviewCell);


// // insert the row into the table using the insertAdjacentElement() method
// reviewsTable.insertAdjacentElement("beforeend", row);





// removeForm.addEventListener(
//     'submit',
//     (e) => {
//         e.preventDefault();
//         // get the review id from the input field
//         const idToRemove = removeId.value;
//         // filter out the review with the specified id
//         movieReviews = movieReviews.filter((review) => review.id !== parseInt(idToRemove));
//         // update local storage and re-render the table
//         localStorage.setItem("Movie Reviews", JSON.stringify(movieReviews, null, 2));
//         retrieveBtn.click();
//     }
// )


removeBtn.addEventListener(
    'click',
    () => {
        // get the review id from the input field
        const idToRemove = removeID.value;
        // check if review with the specified id exists
        const reviewToRemove = movieReviews.find((review) => review.id === parseInt(idToRemove));
        if (reviewToRemove) {
            // filter out the review with the specified id
            movieReviews = movieReviews.filter((review) => review.id !== parseInt(idToRemove));
            // update local storage and re-render the table
            localStorage.setItem("Movie Reviews", JSON.stringify(movieReviews));
            retrieveBtn.click();
        } else {
            // show an error message
            reviewError.innerText = "ID No. does not exist.";
        }
    }
)

const removeAllBtn = document.querySelector("#removeAllBtn");
removeAllBtn.addEventListener("click", () => {

    if (confirm("Are you sure you want to delete all the data from Local Storage?")) {

        // remove all data from local storage
        localStorage.removeItem("Movie Reviews");
        // update the table to reflect the changes
        retrieveBtn.click();

        alert("All data has been deleted successfully.");

    }
});
 console.log(reviewsTable);