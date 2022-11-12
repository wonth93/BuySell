// Client facing scripts here
$(document).ready(function () {
  //grabbing all of the tweets via ajax
  const loadCars = () => {
    $.ajax({
      url: "/api/widgets",
      method: "GET",
      dataType: "json",
      success: (carsObject) => {
        //console.log(typeof carsObject);
        const { cars } = carsObject;
        renderCars(cars);
      },
      error: (err) => {
        console.log(`error: ${err}`);
      },
    });
  };

  loadCars();

  //create individual tweet
  const createCarElement = (carData) => {
    const {
      id,
      title,
      manufacturer,
      condition,
      thumbnail_photo_url,
      mileage,
      price,
    } = carData;
    // const timePassed = timeago.format(created_at);

    // const escape = function (str) {
    //   let div = document.createElement("div");
    //   div.appendChild(document.createTextNode(str));
    //   return div.innerHTML;
    // };

    const $car = $(`<article class="car">
    <div><img src="${thumbnail_photo_url}" class="car-image" width="200"></img></div>
    <div>
      <h3>${title}</h3>
      <ul>
        <li>Manufacturer:${manufacturer}</li>
        <li>Condition:${condition}</li>
        <li>Price: $${price}</li>
        <li>Mileage: ${mileage} miles</li>
      </ul>
      <footer>
        <ul>
          <li><a href="/api/widgets/${id}">Learn More</a></li>
          <li>Favourite</li>
        </ul>
      </footer>
  </div>
  </article>`);

    return $car;
  };

  //rendering all of the tweets after grabbing them via ajax into the tweet container
  const renderCars = (cars) => {
    //$("#cars-container").empty();
    console.log(cars);
    for (let car of cars) {
      const $car = createCarElement(car);
      $("#cars-container").prepend($car);
    }
  };

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
