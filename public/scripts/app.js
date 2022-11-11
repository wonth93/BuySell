// Client facing scripts here
$(document).ready(function () {
  //grabbing all of the tweets via ajax
  const loadCars = () => {
    $.ajax({
      url: "/api/widgets",
      method: "GET",
      dataType: "json",
      success: (cars) => {
        console.log("data", cars);
        //renderTweets(tweets);
      },
      error: (err) => {
        console.log(`error: ${err}`);
      },
    });
  };

  loadCars();

  // //create individual tweet
  // const createTweetElement = function (tweetData) {
  //   const { user, content, created_at } = tweetData;
  //   const timePassed = timeago.format(created_at);

  //   const escape = function (str) {
  //     let div = document.createElement("div");
  //     div.appendChild(document.createTextNode(str));
  //     return div.innerHTML;
  //   };

  //   const $tweet = $(`<article class="tweet">
  //   <header>
  //     <div>
  //       <img src="${user.avatars}" class="avatar"></img>
  //       <span class="tweet-name">${user.name}</span>
  //     </div>
  //     <span class="tweet-username">${user.handle}</span>
  //   </header>
  //   <div><p>${escape(content.text)}</p></div>
  //   <footer>
  //     <span class="tweet-time">${timePassed}</span>
  //     <span class="tweet-icons">
  //       <i class="fa-solid fa-flag"></i>
  //       <i class="fa-sharp fa-solid fa-retweet"></i>
  //       <i class="fa-sharp fa-solid fa-heart"></i>
  //     </span>
  //   </footer>
  // </article>`);

  //   return $tweet;
  // };

  // //rendering all of the tweets after grabbing them via ajax into the tweet container
  // const renderTweets = function (tweets) {
  //   $("#tweets-container").empty();
  //   for (let tweet of tweets) {
  //     const $tweet = createTweetElement(tweet);
  //     $("#tweets-container").prepend($tweet);
  //   }
  // };

  // //tweet form - posting to the tweets data and handling errors
  // const form = $(".tweet-form");
  // form.on("submit", function (event) {
  //   event.preventDefault();
  //   const tweetText = $(this).find("textarea");
  //   let characterCount = tweetText.val().length;

  //   const errMessage = $("#error-message");
  //   const errMessageText = errMessage.find("span");

  //   if (characterCount > 140) {
  //     errMessage.slideUp();
  //     errMessageText.text("Please ensure your tweet is under 140 characters.");
  //     errMessage.slideDown();
  //   } else if (characterCount <= 0) {
  //     errMessage.slideUp();
  //     errMessageText.text("Please ensure your tweet is not empty.");
  //     errMessage.slideDown();
  //   } else {
  //     errMessage.slideUp();

  //     const serializedData = $(event.target).serialize();

  //     $.post("/tweets", serializedData, (response) => {
  //       loadTweets();
  //     });

  //     form.trigger("reset");
  //     $(".counter").text("140");
  //   }
  // });
});
