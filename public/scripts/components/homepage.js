const loadHomepage = function () {
  const $main = $("#main-content");
  const $homepage = `<h2>All Cars</h2>
  <section id="cars-container"></section>`;

  $main.empty();
  $main.append($homepage);

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

  $("#cars-container").on("click", () => console.log("clicked!"));
};
