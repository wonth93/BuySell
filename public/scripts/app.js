// Client facing scripts here
$(document).ready(function () {

  // header link element
  const $header = `<ul class="header-links">
    <li id="home" style="cursor: pointer">Home</li>
    <li id="my-listings" style="cursor: pointer">My Listings</li>
    <li id="my-favourites" style="cursor: pointer">My Favourites</li>
    <li id="create-listing" style="cursor: pointer">Create a New Listing</li>
    <li id="my-messages" style="cursor: pointer">My messages</li>
    <form class="logout-button" method="POST" action="/api/users/logout"><button style="cursor: pointer">Logout</button></form>
  </ul>`;

  $("#page-header").prepend($header);

  const $main = $("#main-content");


  // ********************** Load the homepage with all the listings ********************** //
  const loadHomepage = function () {
    $main.empty();

    // Filter element
    $main.append(` <h2 class="section-title">All Cars</h2>
    <h4 class="filter-title">Filter by price</h4>
    <form
      action="/cars/price"
      method="GET"
      id="filter-car-form"
      class="filter-car-form"
    >
      <div class="filter-car-form__field-wrapper">

        <label for="filter-car-form__minimum-price-per-night">Minimum Cost</label>
        <input type="number" name="minimum_price" placeholder="Minimum Cost" id="filter-car-form__minimum-price">

        <label for="filter-car-form__maximum-price-per-night">Maximum Price</label>
        <input
          type="number"
          name="maximum_price"
          placeholder="Maximum Price"
          id="filter-car-form__maximum-price"
        >
      </div>

      <div class="filter-car-form__field-wrapper">
        <button class="submit-filter" type="submit" style="cursor: pointer">Search</button>
        <span class="clear-filter" style="cursor: pointer">Clear Filter</span>
        <!-- <a id="filter-car-form__cancel" href="#">Cancel</a> -->
      </div>
    </form>
    <section id="error-message"></section>
    <section id="cars-container"></section>`);

    // Function that loads all cars to home page function
    const loadCars = (params) => {
      let url = "/cars";

      if (params) {
        url = `/cars/price?${params}`;
      }

      $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: (carsObject) => {
          const { cars } = carsObject;
          if (cars.length === 0) {
            $("#error-message").append(`<h3>Sorry, no cars available</h3>`);
          }
          renderCars(cars);
        },
        error: (err) => {
          console.log(`error: ${err}`);
        },
      });
    };

    loadCars();

    // Function that create individual car element on home page function
    const createCarElement = (carData) => {
      const {
        id,
        title,
        manufacturer,
        condition,
        thumbnail_photo_url,
        mileage,
        price,
        active,
        year,
      } = carData;

      const $car = $(`<article class="car active-${active}" id=${id}>
      <div><img src="${thumbnail_photo_url}" class="car-image"></img></div>
      <div class="car-info">
        <h3>${title}</h3>
        <div class="car-details">
        <ul>
          <li>Manufacturer: ${manufacturer}</li>
          <li>Year: ${year}</li>
          <li>Condition: ${condition}</li>
          <li>Price: $${price}</li>
          <li>Mileage: ${mileage} miles</li>
        </ul>
        <footer class="car-actions">
          <ul>
            <li class="sold">SOLD</li>
            <li><button class="learn-more" style="cursor: pointer">Learn More</button></li>
            <li><form class="add-fav" method="POST" action="/api/users/myFavourites/${id}/add"><button class="add-fav-button" style="cursor: pointer">Favourite</button></form><li>
          </ul>
        </footer>
        </div>
    </div>
    </article>`);

      return $car;
    };

    // Function that renders all cars after grabbing them via ajax into the page
    const renderCars = (cars) => {
      $("#cars-container").empty();
      for (let car of cars) {
        const $car = createCarElement(car);
        $("#cars-container").prepend($car);
      }
    };

    // On click event to load single car info
    $("#cars-container").on("click", ".learn-more", function () {
      $("#error-message").empty();
      const id = $(this).closest("article").attr("id");
      loadSingleCarPage(id);
    });

    // On click event to clear filter and reload all cars
    $("#filter-car-form").on("click", ".clear-filter", function (event) {
      $("#error-message").empty();
      loadCars();
    });

    // On submit event to load filtered list of cars
    $("#filter-car-form").on("submit", function (event) {
      event.preventDefault();
      $("#error-message").empty();
      const data = $(this).serialize();
      loadCars(data);
    });
  };

  // Calling load homepage when index loads
  loadHomepage();


  // ********************** Load my listings page ********************** //
  const loadMyListings = function () {
    $main.empty();
    $main.append(` <h2 class="section-title">My listings</h2>
    <section id="cars-container"></section>`);

    // Function that loads all cars that are list by the seller function
    const loadListings = () => {
      $.ajax({
        url: "/api/users/myListings",
        method: "GET",
        dataType: "json",
        success: (carsObject) => {
          const { cars } = carsObject;
          renderListings(cars);
        },
        error: (err) => {
          console.log(`error: ${err}`);
        },
      });
    };

    loadListings();

    // Function that creates individual car element on the my listings page
    const createCarElement = (carData) => {
      console.log(carData);
      const {
        id,
        title,
        manufacturer,
        condition,
        thumbnail_photo_url,
        mileage,
        price,
        year,
        active,
      } = carData;

      const $car = $(`<article class="car active-${active}" id=${id}>
      <div><img src="${thumbnail_photo_url}" class="car-image" ></img></div>
      <div class="car-info">
        <h3>${title}</h3>
        <div class="car-details">
        <ul>
          <li>Manufacturer: ${manufacturer}</li>
          <li>Year: ${year}</li>
          <li>Condition: ${condition}</li>
          <li>Price: $${price}</li>
          <li>Mileage: ${mileage} miles</li>
        </ul>
        <footer class="car-actions">
          <ul>
          <li class="sold">SOLD</li>
          <li><form class="delete-listing" method="POST" action="/cars/${id}/delete"><button class="delete-listing-button" style="cursor: pointer">Delete this listing</button></form></li>
          <li><form class="mark-sold" method="POST" action="/cars/${id}/sold"><button class="mark-sold-button" style="cursor: pointer">Mark As Sold</button></form></li>
          </ul>
        </footer>
        </div>
    </div>
    </article>`);

      return $car;
    };

    // Function that renders all cars after grabbing them via ajax into my listings page
    const renderListings = (cars) => {
      $("#cars-container").empty();
      console.log(cars);
      for (let car of cars) {
        const $car = createCarElement(car);
        $("#cars-container").prepend($car);
      }
    };

  };


  // ********************** Loading the my favourites ********************** //
  const loadMyFavs = function () {
    $main.empty();
    $main.append(` <h2 class="section-title">My favourites</h2>
    <section id="cars-container"></section>`);

    // Function that loads users' favourite cars
    const loadFavs = () => {
      $.ajax({
        url: "/api/users/myFavourites",
        method: "GET",
        dataType: "json",
        success: (carsObject) => {
          const { cars } = carsObject;
          renderFavs(cars);
        },
        error: (err) => {
          console.log(`error: ${err}`);
        },
      });
    };

    loadFavs();

    // Function that creates individual car element on the my favourites page
    const createCarElement = (carData) => {
      const {
        id,
        car_fav_id,
        title,
        manufacturer,
        condition,
        thumbnail_photo_url,
        mileage,
        price,
        active,
      } = carData;

      const $car = $(`<article class="car active-${active}"id=${id}>
      <div><img src="${thumbnail_photo_url}" class="car-image"></img></div>
      <div class="car-info">
        <h3>${title}</h3>
        <div class="car-details">
        <ul>
          <li>Manufacturer ${manufacturer}</li>
          <li>Condition: ${condition}</li>
          <li>Price: $${price}</li>
          <li>Mileage: ${mileage} miles</li>
        </ul>
        <footer class="car-actions">
          <ul>
          <li class="sold">SOLD</li>
            <li><button class="learn-more" style="cursor: pointer">Learn More</button></li>
            <li><form class="remove-fav" method="POST" action="/api/users/myFavourites/${car_fav_id}/delete"><button type="submit" style="cursor: pointer">Remove from favourites</button></form><li>
          </ul>
        </footer>
        </div>
    </div>
    </article>`);

      return $car;
    };

    // Function that renders all cars after grabbing them via ajax into my favourites page
    const renderFavs = (cars) => {
      $("#cars-container").empty();
      for (let car of cars) {
        const $car = createCarElement(car);
        $("#cars-container").prepend($car);
      }
    };

    $("#cars-container").on("click", ".learn-more", function () {
      const id = $(this).closest("article").attr("id");
      loadSingleCarPage(id);
    });
  };


  // ********************** Load the createListing form ********************** //
  const loadCreateListing = function () {
    $main.empty();
    $main.append(`<h3 class="section-title">Sell your car</h3>
    <section id="new-car-container"></section>`);

    // Create new listing form element
    const $createListingForm = $(`
    <form action="cars/add" method="post" id="new-car-form">

      <div class="new-car-form-wrapper">
      <label>Model</laber>
      <input type="text" name="title" placeholder="Model" id="new-car-form_title">
      </div>

      <div class="new-car-form-wrapper">
      <label>Manufacturer</laber>
      <input type="text" name="manufacturer" placeholder="Manufacturer" id="new-car-form_manufacturer">
      </div>

      <div class="new-car-form-wrapper">
      <label>Condition</laber>
      <input type="text" name="condition" placeholder="Condition" id="new-car-form_condition">
      </div>

      <div class="new-car-form-wrapper">
      <label>Description</laber>
      <textarea name="description" placeholder="Description" id="new-car-form_description" cols="30" rows="10"></textarea>
      </div>

      <div class="new-car-form-wrapper">
      <label>Thumbnail Image</laber>
      <input type="text" name="thumbnail_photo_url" placeholder="Thumbnail Image" id="new-car-form_thumbnail_photo_url">
      </div>

      <div class="new-car-form-wrapper">
      <label>Cover Image</laber>
      <input type="text" name="cover_photo_url" placeholder="Cover Image" id="new-car-form_cover_photo_ur">
      </div>

      <div class="new-car-form-wrapper">
      <label>Price</laber>
      <input type="number" name="price" placeholder="Price" id="new-car-form_price">
      </div>

      <div class="new-car-form-wrapper">
      <label>Mileage</laber>
      <input type="number" name="mileage" placeholder="Mileage" id="new-car-form_mileage">
      </div>

      <div class="new-car-form-wrapper">
      <label>Year</laber>
      <input type="number" name="year" placeholder="Year" id="new-car-form_year">
      </div>

      <div class="new-car-form-wrapper">
        <button type="submit" style="cursor: pointer">Create</button>
      </div>

    </form>
    `);

    $("#new-car-container").append($createListingForm);
  };


  // ********************** Rendering an individual car page ********************** //
  const loadSingleCarPage = function (id) {
    $main.empty();
    $main.append(`<h3 class="section-title">View Car Details</h3>`);
    const url = `/cars/${id}`;

    // Loads individual car info
    $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      success: (carObject) => {
        createSingleCar(carObject);
      },
      error: (err) => {
        console.log(`error: ${err}`);
      },
    });

    // // Function that creates individual car info element
    const createSingleCar = function (carObject) {
      const {
        id,
        seller_id,
        title,
        manufacturer,
        condition,
        thumbnail_photo_url,
        mileage,
        price,
        description,
        year,
      } = carObject;

      const $singleCar = $(`<section class="single-car-container" id=${id}>
      <article class="single-car">
          <div><img src=${thumbnail_photo_url}></img></div>
          <div class="single-car-info">
            <h2>${title}</h2>
          <div class="single-car-details">
            <ul>
              <li>Manufacturer: ${manufacturer}</li>
              <li>Year: ${year}</li>
              <li>Condition: ${condition}</li>
              <li>Price: $${price}</li>
              <li>Mileage: ${mileage}</li>
              <li>Description: ${description}</li>
            </ul>
            <form class="add-fav" method="POST" action="/api/users/myFavourites/${id}/add"><button style="cursor: pointer">Favourite</button></form>
          </div>
          <footer class="single-car-message">
          <hr />
            <h3>Message the seller about this car</h3>
            <form class="send-message" method="POST" action="api/users/myMessages/${seller_id}/${id}/add">
              <textarea name="text" class="feedback-input" placeholder="Message here"></textarea>
              <button type="submit" style="cursor: pointer">Send Message</button>
              </form>
            </footer>
          </div>
      </article>
    </section>`);

      $main.append($singleCar);

      ////////Send message functionality////////////
      $(".send-message").on("submit", function () {
        alert(`Message sent to seller #${seller_id}`);
      });
    };
  };


  // ********************** Loading messages page ********************** //
  const loadMyMessages = function () {
    $main.empty();
    $main.append(`<h2 class="section-title">My Messages</h2>
    <section id="messages-container"></section>`);

    // Function that loads users' messages
    const loadMessages = () => {
      $.ajax({
        url: "/api/users/myMessages",
        method: "GET",
        dataType: "json",
        success: (messagesObject) => {
          const { messages } = messagesObject;
          renderMessages(messages);
        },
        error: (err) => {
          console.log(`error: ${err}`);
        },
      });
    };

    loadMessages();

    // Function that create message element
    const createMessageElement = (singleMessage) => {
      const {
        sender_id,
        car_id,
        date_sent,
        message,
        senderid,
        carid,
      } = singleMessage;

      const $message = $(`<article class="message">
    <div class="message-details">
      <h3>Message From ${senderid} about ${carid}</h3>
      <p>Recieved: ${date_sent}</p>
      <p>${message}</p>
    </div>
    <div class="reply-message">
      <h3>Respond to Message</h3>
      <form
        class="send-message"
        method="POST"
        action="api/users/myMessages/${sender_id}/${car_id}/add"
      >
        <textarea
          name="text"
          class="feedback-input"
          placeholder="Comment"
        ></textarea>
        <button type="submit" style="cursor: pointer">Send Message</button>
      </form>
    </div>
  </article>`);

      return $message;
    };

    // // Function that renders all messages after grabbing them via ajax into my messages page
    const renderMessages = (messages) => {
      $("#messages-container").empty();
      for (let message of messages) {
        const $message = createMessageElement(message);
        $("#messages-container").prepend($message);
      }
    };
  };

  
  // ********************** Managing clicks on header to load different "pages" ********************** //
  $("header").on("click", "#home", () => {
    loadHomepage();
  });

  $("header").on("click", "#my-listings", () => {
    loadMyListings();
  });

  $("header").on("click", "#my-favourites", () => {
    loadMyFavs();
  });

  $("header").on("click", "#create-listing", () => {
    loadCreateListing();
  });

  $("header").on("click", "#my-messages", () => {
    loadMyMessages();
  });

});
