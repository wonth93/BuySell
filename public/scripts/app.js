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

  $("#page-header").append($header);

  const $main = $("#main-content");

  //Loading the homepage with all the listings///////

  const loadHomepage = function () {
    $main.empty();
    $main.append(` <h2>All Cars</h2>
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
            <li><a href="/cars/${id}">Learn More</a></li>
            <li>Favourite</li>
          </ul>
        </footer>
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
  };

  //Calling load homepage when index loads
  loadHomepage();

  ///////////////////////Loading the my listings page/////////////////////////////
  const loadMyListings = function () {
    $main.empty();
    $main.append(` <h2>My listing</h2>
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
            <li class="delete-listing" id=${id}>Delete this listing</li>
            <li class="mark-sold">Mark As Sold</li>
          </ul>
        </footer>
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

    //Deleting a listing or marking a listing as sold
    $("#cars-container").on("click", (e) => {
      //console.log(e.target);
      //Delete a listing
      const id = e.target.id;
      console.log(id);
      if (e.target.classList.contains("delete-listing")) {
        // const id = e.target.id;
        // console.log(id);
        const url = `/delete/${id}`;
        console.log(
          "send post/delete request to:",
          url,
          "then call loadListings()"
        );
        //$.post(url).then(loadListings())
      }

      //Mark as sold
    });
  };

  // Loading the my favourites
  const loadMyFavs = function () {
    $main.empty();
    $main.append(` <h2>My favourites</h2>
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
            <li><a href="/cars/${id}">Learn More</a></li>
            <li>Favourite</li>
          </ul>
        </footer>
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
  };

  const loadCreateListing = function () {
    $main.empty();
    $main.append("<p>Create Listing Form Here</p>");
  };

  const loadMyMessages = function () {
    $main.empty();
    $main.append("<p>My messages</p>");
  };

  //Managing clicks on header to load different "pages"
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

  // $("header").on("click", ".logout-button", () => {
  //   loadMyMessages();
  // });
});
