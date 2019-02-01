//Fetch call to URL of show page
function getReview() {
    const url = '';
    const reviewData = '';
    fetch (url, {
        method: 'GET',
        body: JSON.stringify(reviewData),
    }) 
    .then(res => res.json)
    .then(res => Review);
}

//Construct Review objs.
class Review {
    constructor(id, user_id, category_id, category, title, content, created_at) {
        this.id = id;
        this.user_id = user_id;
        this.category_id = category_id;
        this.category = category;
        this.title = title;
        this.content = content;
        this.created_at = created_at;
    }
}

//prototype built off of Review constructor to render a review to a show page
Review.prototype.renderToPage = () => {
    $("#heading").append(`${this.title}`)
    $("#review-sub-label").append(`${this.category.title}`)
    $("#content").append(`${this.content}`)
    $("#timestamp").append(`${this.created_at}`)
}




//JS Flow:

// 1. On load show reviews (document.ready)
// 2. Make fetch call to URL of show page (fetch)
// 3. Construct Review objects (constructor function)
// 4. Call renderToPage (line 14) on Obj.
// 5. Remove HTML for reviews from views

// 1. load reviews 
// 2. create button to create new review (on 'click' event listener)
// 3. clicking button creates form (authen issue ask Gina)
// 4. Makes POST request to controller via Fetch call
// 5. Append to div 
// 6. delete form if up for it

// TEST OFTEN - Enoch
