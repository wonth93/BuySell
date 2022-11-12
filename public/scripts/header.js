// Client facing scripts here
$(document).ready(function () {
  //grabbing all of the tweets via ajax

  const $header = `<ul>
  <li>Home</li>
  <li>My Listings</li>
  <li>My Favourites</li>
  <li>Create a New Listing</li>
  <li>My messages</li>
</ul>`;

  $("#page-header").append($header);
});
