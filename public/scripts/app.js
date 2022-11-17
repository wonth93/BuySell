// Client facing scripts here
$(document).ready(function () {
  //grabbing all of the tweets via ajax

  const $header = `<ul class="header-links">
    <li id="home">Home</li>
    <li id="my-listings">My Listings</li>
    <li id="my-favourites">My Favourites</li>
    <li id="create-listing">Create a New Listing</li>
    <li id="my-messages">My messages</li>
    <form class="logout-button" method="POST" action="/api/users/logout"><button>Logout</button></form>
  </ul>`;

  $("#page-header").prepend($header);

  const $main = $("#main-content");

  //Loading the homepage with all the listings///////

  const loadHomepage = function () {
    $main.empty();
    $main.append(` <h2 class="section-title">All Cars</h2>
    <h4>Filter by price</h4>
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
        <button class="submit-filter" type="submit">Search</button>
        <span class="clear-filter">Clear Filter</span>
        <!-- <a id="filter-car-form__cancel" href="#">Cancel</a> -->
      </div>
    </form>
    <section id="error-message"></section>
    <section id="cars-container"></section>`);

    const loadCars = (params) => {
      let url = "/cars";
      if (params) {
        url = `/cars/price?${params}`;
      }
      //alert(url);

      $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: (carsObject) => {
          //console.log(typeof carsObject);
          const { cars } = carsObject;
          if (cars.length === 0) {
            //$("#error-message").empty();
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
        description,
        active,
      } = carData;
      // const timePassed = timeago.format(created_at);

      // const escape = function (str) {
      //   let div = document.createElement("div");
      //   div.appendChild(document.createTextNode(str));
      //   return div.innerHTML;
      // };

      const $car = $(`<article class="car active-${active}" id=${id}>
      <div><img src="${thumbnail_photo_url}" class="car-image"></img></div>
      <div class="car-info">
        <h3>${title}</h3>
        <div class="car-details">
        <ul>
          <li>Manufacturer: ${manufacturer}</li>
          <li>Condition: ${condition}</li>
          <li>Price: $${price}</li>
          <li>Mileage: ${mileage} miles</li>
          <li>Description: ${description}</li>
        </ul>
        <footer class="car-actions">
          <ul>
            <li class="sold">SOLD</li>
            <li><button class="learn-more">Learn More</button></li>
            <li><form class="add-fav" method="POST" action="/api/users/myFavourites/${id}/add"><button class="add-fav-button">Favourite</button></form><li>
          </ul>
        </footer>
        </div>
    </div>
    </article>`);

      return $car;
    };

    //rendering all of the tweets after grabbing them via ajax into the tweet container
    const renderCars = (cars) => {
      $("#cars-container").empty();
      //console.log(cars);
      for (let car of cars) {
        const $car = createCarElement(car);
        $("#cars-container").prepend($car);
      }
    };

    //Adding a car to favourites
    $("#cars-container").on("click", ".add-fav", function (e) {
      const id = $(this).closest("article").attr("id");
      const url = `api/users/myFavourites/${id}`;
      alert(`send a postrequest to ${url} then call loadFavs()`);
    });

    $("#cars-container").on("click", ".learn-more", function () {
      //loadSingleCarPage();
      $("#error-message").empty();
      const id = $(this).closest("article").attr("id");
      //alert(`rendering message form about ${id} car`);
      loadSingleCarPage(id);
    });

    $("#filter-car-form").on("click", ".clear-filter", function (event) {
      //event.preventDefault();
      //const data = $(this).serialize();
      //alert(data);
      $("#error-message").empty();
      loadCars();
    });

    $("#filter-car-form").on("submit", function (event) {
      event.preventDefault();
      //$("#error-message").empty();
      const data = $(this).serialize();
      //alert(data);
      loadCars(data);
    });
  };

  //Calling load homepage when index loads
  loadHomepage();

  ///////////////////////Loading the my listings page/////////////////////////////
  const loadMyListings = function () {
    $main.empty();
    $main.append(` <h2 class="section-title">My listings</h2>
    <section id="cars-container"></section>`);

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

    //create individual tweet
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
        description,
        active,
      } = carData;
      // const timePassed = timeago.format(created_at);

      // const escape = function (str) {
      //   let div = document.createElement("div");
      //   div.appendChild(document.createTextNode(str));
      //   return div.innerHTML;
      // };

      const $car = $(`<article class="car active-${active}" id=${id}>
      <div><img src="${thumbnail_photo_url}" class="car-image" ></img></div>
      <div class="car-info">
        <h3>${title}</h3>
        <div class="car-details">
        <ul>
          <li>Manufacturer: ${manufacturer}</li>
          <li>Condition: ${condition}</li>
          <li>Price: $${price}</li>
          <li>Mileage: ${mileage} miles</li>
          <li>Description: ${description}</li>
        </ul>
        <footer class="car-actions">
          <ul>
          <li class="sold">SOLD</li>
          <li><form class="delete-listing" method="POST" action="/cars/${id}/delete"><button class="delete-listing-button">Delete this listing</button></form></li>
          <li><form class="mark-sold" method="POST" action="/cars/${id}/sold"><button class="mark-sold-button">Mark As Sold</button></form></li>
          </ul>
        </footer>
        </div>
    </div>
    </article>`);

      return $car;
    };

    //rendering all of the tweets after grabbing them via ajax into the tweet container
    const renderListings = (cars) => {
      $("#cars-container").empty();
      console.log(cars);
      for (let car of cars) {
        const $car = createCarElement(car);
        $("#cars-container").prepend($car);
      }
    };

    // //Delete a listing
    // $("#cars-container").on("click", ".delete-listing", function (e) {
    //   const id = $(this).closest("article").attr("id");
    //   // const url = `api/users/myListings/${id}/delete`;
    //   //alert(`Successfully deleted Car Listing  #${id}`);
    //   //loadHomepage();
    // });

    //Delete a listing
    // $(".delete-listing").on("submit", function (e) {
    //   e.preventDefault();
    //   const id = $(this).closest("article").attr("id");
    //   alert(`Successfully deleted Car Listing  #${id}`);
    //   loadListings();
    //   //loadHomepage();
    // });
    $("#cars-container").on("click", ".delete-listing", function (e) {
      const id = $(this).closest("article").attr("id");
      //const url = `api/users/myFavourites/${id}/delete`;
      alert(`Deleted car #${id} from your listings`);
    });

    //Mark a listing as sold

    // $("#cars-container").on("click", ".mark-sold", function (e) {
    //   const id = $(this).closest("article").attr("id");
    //   const url = `api/users/myListings/${id}`;
    //   alert(`send a post/update request to ${url} then call loadListings()`);
    //   loadSoldListing();
    //   // loadListings();
    // });
  };

  /////////////////// Loading the my favourites//////////////
  const loadMyFavs = function () {
    $main.empty();
    $main.append(` <h2 class="section-title">My favourites</h2>
    <section id="cars-container"></section>`);

    const loadFavs = () => {
      $.ajax({
        url: "/api/users/myFavourites",
        method: "GET",
        dataType: "json",
        success: (carsObject) => {
          //console.log(typeof carsObject);
          const { cars } = carsObject;
          renderFavs(cars);
        },
        error: (err) => {
          console.log(`error: ${err}`);
        },
      });
    };

    loadFavs();

    //create individual tweet
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
        description,
        active,
      } = carData;
      // const timePassed = timeago.format(created_at);

      // const escape = function (str) {
      //   let div = document.createElement("div");
      //   div.appendChild(document.createTextNode(str));
      //   return div.innerHTML;
      // };

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
          <li>Description: ${description}</li>
        </ul>
        <footer>
          <ul>
          <li class="sold">SOLD</li>
            <li><button class="learn-more">Learn More</button></li>
            <li><form class="remove-fav" method="POST" action="/api/users/myFavourites/${car_fav_id}/delete"><button type="submit">Remove from favourites</button></form><li>
          </ul>
        </footer>
        </div>
    </div>
    </article>`);

      return $car;
    };

    //rendering all of the tweets after grabbing them via ajax into the tweet container
    const renderFavs = (cars) => {
      $("#cars-container").empty();
      //console.log(cars);
      for (let car of cars) {
        const $car = createCarElement(car);
        $("#cars-container").prepend($car);
      }
    };

    $("#cars-container").on("click", ".remove-fav", function (e) {
      const id = $(this).closest("article").attr("id");
      //const url = `api/users/myFavourites/${id}/delete`;
      alert(`Deleted car #${id} from Favourites`);
    });

    $("#cars-container").on("click", ".learn-more", function () {
      //loadSingleCarPage();
      const id = $(this).closest("article").attr("id");
      //alert(`rendering message form about ${id} car`);
      loadSingleCarPage(id);
    });
  };

  /////////Load the createListing form//////////////////////
  const loadCreateListing = function () {
    $main.empty();
    $main.append(`<p>Create Listing Form Here</p>
    <section id="new-car-container"></section>`);

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
        <button type="submit">Create</button>
      </div>

    </form>
    `);

    $("#new-car-container").append($createListingForm);
  };

  ///////// Rendering an individual car page //////////////
  const loadSingleCarPage = function (id) {
    $main.empty();
    $main.append(`<h3 class="section-title">View Car Details</h3>`);
    const url = `/cars/${id}`;

    $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      success: (carObject) => {
        //console.log(typeof carsObject);
        // const { cars } = carsObject;
        createSingleCar(carObject);
        //console.log(carObject);
      },
      error: (err) => {
        console.log(`error: ${err}`);
      },
    });

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
        active,
      } = carObject;

      const $singleCar = $(`<section class="single-car-container" id=${id}>
      <article class="single-car">
          <div><img src=${thumbnail_photo_url} width="600"></img></div>
          <div class="single-car-details">
            <h2>${title}</h2>
            <ul>
              <li>Manufacturer: ${manufacturer}</li>
              <li>Condition: ${condition}</li>
              <li>Price: $${price}</li>
              <li>Mileage: ${mileage}</li>
              <li>Description: ${description}</li>
              <li><form class="add-fav" method="POST" action="/api/users/myFavourites/${id}/add"><button>Favourite</button></form></li>
            </ul>
            <h3>Message the seller about this car</h3>
            <form class="send-message" method="POST" action="api/users/myMessages/${seller_id}/${id}/add">
        <textarea name="text" class="feedback-input" placeholder="Comment"></textarea>
        <input type="submit" value="SUBMIT"/>
    </form>
        </div>
      </article>
    </section>`);

      $main.append($singleCar);

      ////////Send message functionality////////////
      $(".send-message").on("click", function () {
        alert(`message sent to seller: ${seller_id}`);
      });
    };
  };

  /////////////Loading messages page/////////////////////////
  const loadMyMessages = function () {
    $main.empty();
    $main.append(`<h2 class="section-title">My Messages</h2>
    <section id="messages-container"></section>`);

    const loadMessages = () => {
      $.ajax({
        url: "/api/users/myMessages",
        method: "GET",
        dataType: "json",
        success: (messagesObject) => {
          //console.log(typeof carsObject);
          const { messages } = messagesObject;
          renderMessages(messages);
          //console.log(messages);
        },
        error: (err) => {
          console.log(`error: ${err}`);
        },
      });
    };

    loadMessages();

    const createMessageElement = (singleMessage) => {
      const {
        id,
        sender_id,
        receiver_id,
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
        <input type="submit" value="SUBMIT" />
      </form>
    </div>
  </article>`);

      return $message;
    };

    const renderMessages = (messages) => {
      $("#messages_container").empty();
      for (let message of messages) {
        const $message = createMessageElement(message);
        $("#messages-container").prepend($message);
      }
    };
    // const renderCars = (cars) => {
    //   $("#cars-container").empty();
    //   //console.log(cars);
    //   for (let car of cars) {
    //     const $car = createCarElement(car);
    //     $("#cars-container").prepend($car);
    //   }
  };

  //////////////Managing clicks on header to load different "pages"/////////
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

  /////////////Managing clicks on message seller button/////////
  // $("#cars-container").on("click", ".learn-more", function () {
  //   //loadSingleCarPage();
  //   const id = $(this).closest("article").attr("id");
  //   //alert(`rendering message form about ${id} car`);
  //   loadSingleCarPage(id);
  // });

  // $("header").on("click", ".logout-button", () => {
  //   loadMyMessages();
  // });
});
