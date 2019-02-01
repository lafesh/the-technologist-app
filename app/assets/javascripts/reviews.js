// class Review {
//     constructor(id, user_id, category_id, category, title, content, created_at) {
//         this.id = id;
//         this.user_id = user_id;
//         this.category_id = category_id;
//         this.category = category;
//         this.title = title;
//         this.content = content;
//         this.created_at = created_at;
//     }
// }

// //prototype built off of Review constructor to render a review to a show page
// Review.prototype.renderToPage = () => {
//     $("#heading").append(`${this.title}`)
//     $("#review-sub-label").append(`${this.category.title}`)
//     $("#content").append(`${this.content}`)
//     $("#timestamp").append(`${this.created_at}`)
// }