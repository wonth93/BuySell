// Client facing scripts here
$(document).ready(function () {
  //grabbing all of the tweets via ajax

  const $header = `<ul>
    <li class="home">Home</li>
    <li class="my-listings">My Listings</li>
    <li class="my-favourites">My Favourites</li>
    <li class="create-listing">Create a New Listing</li>
    <li class="my-messages">My messages</li>
    <li class="logout-button">Logout</li>
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
            <li class="learn-more" id="${id}">Learn More</li>
            <li id="${id}">Favourite</li>
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

    const loadSingleCar = (id) => {
      const url = `/cars/${id}`;
      $.get(url, (response) => {
        console.log(
          response.id,
          response.title,
          response.manufacturer,
          response.condition,
          response.description
        );
      });

      // $main.empty();
      // $main.append(`<`);
    };

    //adding event listener to cars container to grab id of individual cars are render single car page
    $("#cars-container").on("click", (e) => {
      //console.log("target", e.target.classList.contains("learn-more"));
      //console.log("current", e.currentTarget);
      if (e.target.classList.contains("learn-more")) {
        console.log(e.target.id);
        const car_id = e.target.id;
        loadSingleCar(car_id);
      }
    });

    // $(".car").on("click", (e) => {
    //   console.log("target", e.target);
    //   console.log("current", e.currentTarget);
    // });

    // $(".learn-more").on("click", (e) => {
    //   console.log(this);
    // });
  };

  //Calling load homepage when index loads
  loadHomepage();

  //Loading the my listings page
  const loadMyListings = function () {
    $main.empty();
    $main.append("<p>My listings here</p>");

    const loadCars = () => {
      $.ajax({
        url: "/cars/my-listings",
        method: "GET",
        dataType: "json",
        success: (carsObject) => {
          //console.log(typeof carsObject);
          const { cars } = carsObject;
          //renderCars(cars);
          console.log(cars);
        },
        error: (err) => {
          console.log(`error: ${err}`);
        },
      });
    };

    loadCars();
  };

  const loadMyFavs = function () {
    $main.empty();
    $main.append("<p>My favs here</p>");
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
  $("header").on("click", ".home", () => {
    loadHomepage();
  });

  $("header").on("click", ".my-listings", () => {
    loadMyListings();
  });

  $("header").on("click", ".my-favourites", () => {
    loadMyFavs();
  });

  $("header").on("click", ".create-listing", () => {
    loadCreateListing();
  });

  $("header").on("click", ".my-messages", () => {
    loadMyMessages();
  });

  $("header").on("click", ".logout-button", () => {
    loadMyMessages();
  });
});
