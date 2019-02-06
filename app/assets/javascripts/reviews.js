// Fires functions upon docuemnt loading
$(document).ready(() => {
    attachListeners();
})

// Handles all page listeners
function attachListeners() {
    $('.author').click(userReviews) // Renders an individual user's reviews on click
    $('.new-form').click(newReview) // Render a new review form
}

// Submits search form without a page refresh
// function submitSearch() {
//     event.preventDefault();
//     $('#search-form')
//     Rails.fire(search, 'submit');
// }

// Constructs review objects with review params
class Review {
    constructor(id, category, title, content, created_at, username) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.content = content;
        this.created_at = created_at;
        this.username = username;
    }

// Renders constructed objects to page via HTML
renderToPage() {
    let html = `
    <div id="reviews">
    <div class="heading">${this.title}</div>
    <div class="review-sub-label">Written by: ${this.username}</div>
    <div class="review-sub-label">Category: ${this.category}</div>
    <p>${this.content}</p>
    <p>Published: ${this.created_at}</p>
    </div>
    `
    return html;
  };
} 

// Extends truncated review on button click
Review.prototype.extendReview = $(function () {
    $(".show-more").on('click', function() {
      let id = $(this).data("id");
      $.get("/reviews/" + id + "/body", function(data) {
        $("#body-" + id).text(data);
      });
    });
  });


// Gets an indvidual user's reviews via their user_id
function userReviews () {
    event.preventDefault();
    
    let user_id = parseInt($('.author').attr('data-id'));
    //let user_id = window.location.pathname.split('/')[2];
    // debugger
    $.get(`/users/${user_id}.json`, function (data) {
        // console.log(data)
        data.reviews.forEach(function(reviews) {
            console.log(reviews)
           let review = new Review(reviews.id, reviews.title, reviews.username, reviews.category, reviews.content, reviews.created_at)
            
            $('.reviews').append(review.renderToPage())
        });
    });   
}

// Creates a new review via a new, dynamic review form
function newReview() {
    event.preventDefault();

    let user_id = parseInt($('.new-form').attr('data-id'));
    //let user_id = window.location.pathname.split('/')[2];
    $.get(`/users/${user_id}/reviews/new.json`, function(data) {
       // console.log(data)
       //debugger
       
       $('.form').append(
           `
        <select id="selection">
           ${data.categories.forEach(function(category) {
            `<option value="${category.title}">${category.title}</option>`
                })
            }  
       </select>
           
           <form action="/reviews" method="POST">
            <input type="hidden" name="review[user_id]" value="${data.user_id}">
            <input type="hidden" name="review[category_id]" value="${data.category_id}">
            <input type="hidden" name="authenticity_token" value="${$("meta[name=csrf-token]").attr("content")}">
           
          
            <label for="title">Title: </label><input type="text" name="review[title]">
 
            <label for="content">Content: </label><input type="text" name="review[content]">
            <input type="submit" id="create-review" value="Create Review">
           </form>
           `
       )
    });
}


{/*    <select name="categories">
            <option type="hidden" name="review[category_id] value="${data.category}">OPtion</option>
           </select> */}

//Fetch call to URL of show page
// function getReview() {
//     const user_id = window.location.pathname.split('/')[2];
//     const url = `http://localhost:3000/users/${user_id}.json`;

//     fetch(url, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then(res => res.json())
//       .then(res => {
//          console.log(res)
//         // return res
//      });
// }

// function getReview() {
//     onst url = `http://localhost:3000/users/${user_id}`;c
//     const reviewData = {
//         title: document.querySelector('.header'),
//         category: document.querySelector('.review-sub-label'),
//         content: document.querySelector('.content'),
//         created_at: document.querySelector('.timestamp')
//     };

//     fetch (url, {
//         method: 'GET',
//         body: JSON.stringify(reviewData),
//     }) 
//      .then(res => renderToPage);
// }



//   review = new Review;
//   review.renderToPage;

// // Review.prototype.renderToPage =  
// $(document).ready(() => {
//     getReview();
// })

// Review.prototype.renderToPage = () => {
//     $(".header").html(`${this.title}`)
//     $(".review-sub-label").html(`${this.category}`)
//     $(".content").html(`${this.content}`)
//     $(".timestamp").html(`${this.created_at}`)
// }







//JS Flow:

//SHOW PAGE:
// 1. On load show reviews (document.ready)
// 2. Make fetch call to URL of show page (fetch)
// 3. Construct Review objects (constructor function)
// 4. Call renderToPage (line 14) on Obj.
// 5. Remove HTML for reviews from views

//SHOW PAGE (also include on buttom of page):
// 1. load reviews 
// 2. create button to create new review (on 'click' event listener)
// 3. clicking button creates form (authen issue ask Gina)
// 4. Makes POST request to controller via Fetch call
// 5. Append to div 
// 6. delete form if up for it

// TEST OFTEN - Enoch


  //THIS WORKS!!!!!!!!!!!!!!!
//   Review.prototype.renderToPage =  
//     $(document).ready(() => {
//         console.log("ready!");
//     });
  