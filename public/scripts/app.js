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
    <section id="cars-container"></section>`);

    const loadCars = () => {
      $.ajax({
        url: "/cars",
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
        description,
      } = carData;
      // const timePassed = timeago.format(created_at);

      // const escape = function (str) {
      //   let div = document.createElement("div");
      //   div.appendChild(document.createTextNode(str));
      //   return div.innerHTML;
      // };

      const $car = $(`<article class="car" id=${id}>
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
            <li><button class="learn-more">Learn More</button></li>
            <li><button class="msg-seller">Message Seller</button>
            <li><form class="add-fav" method="POST" action="/api/users/myFavourites"><button>Favourite</button></form><li>
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
      console.log(cars);
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
          //console.log(typeof carsObject);
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
      } = carData;
      // const timePassed = timeago.format(created_at);

      // const escape = function (str) {
      //   let div = document.createElement("div");
      //   div.appendChild(document.createTextNode(str));
      //   return div.innerHTML;
      // };

      const $car = $(`<article class="car" id=${id}>
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
        <footer>
          <ul>
            <form class="delete-listing" method="POST" action="/cars/${id}/delete"><button>Delete this listing</button></form>
            <li class="mark-sold">Mark As Sold</li>
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
    $("#cars-container").on("click", ".mark-sold", function (e) {
      const id = $(this).closest("article").attr("id");
      const url = `api/users/myListings/${id}`;
      alert(`send a post/update request to ${url} then call loadListings()`);
      loadListings();
    });
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
        title,
        manufacturer,
        condition,
        thumbnail_photo_url,
        mileage,
        price,
        description,
      } = carData;
      // const timePassed = timeago.format(created_at);

      // const escape = function (str) {
      //   let div = document.createElement("div");
      //   div.appendChild(document.createTextNode(str));
      //   return div.innerHTML;
      // };

      const $car = $(`<article class="car" id=${id}>
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
            <li><button><a href="/cars/${id}">Learn More</a></button></li>
            <li><button>Message Seller</button>
            <li><form class="remove-fav" method="POST" action="/api/users/myFavourites/${id}/delete"><button>Remove from favourites</button></form><li>
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
      console.log(cars);
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
  };

  const loadCreateListing = function () {
    $main.empty();
    $main.append("<p>Create Listing Form Here</p>");
  };

  const loadMyMessages = function () {
    $main.empty();
    $main.append("<p>My messages</p>");
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

      const $singleCar =
        $(`<section class="single-car-container" id=${seller_id}>
      <article class="single-car">
          <div><img src=${thumbnail_photo_url} width="600"></img></div>
          <div class="single-car-details">
            <h2>BMW M3</h2>
            <ul>
              <li>Manufacturer</li>
              <li>condition</li>
              <li>price</li>
              <li>mileage</li>
              <li>Description</li>
            </ul>
            <footer>
              <ul>
                <li><button>Message Seller</button></li>
                <li><button>Favourite</button></li>
              </ul>
            </footer>
        </div>
      </article>
    </section>`);

      $main.append($singleCar);
    };
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
  $("#cars-container").on("click", ".learn-more", function () {
    //loadSingleCarPage();
    const id = $(this).closest("article").attr("id");
    //alert(`rendering message form about ${id} car`);
    loadSingleCarPage(id);
  });

  // $("header").on("click", ".logout-button", () => {
  //   loadMyMessages();
  // });
});
