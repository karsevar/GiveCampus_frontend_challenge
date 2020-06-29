/* 
Dom component that creates the progress bar on the front-flip-card
div container. Data will be received from a fetch call to the 
json in the file system.

Component Structure:
<div class='progress-bar-container'>
    <div class='progress-header'>
        <p>percent raised</p>
        <p>number of donors</p>
    </div>
    <progress bar />
    <div class='progress-subheader'>
        <p>Active</p>
        <div class='donation-sum-container'>
            <p>Total Dollar amount donated</p>
            <p>Donated</p>
        </div>
    </div>
</div>
*/

// First get the dom element that I want to append the
// component to <div class='challenge-details'>

let challengeDetails = document.querySelector(".challenge-details");
// console.log("from fetchData script", challengeDetails);

// Will be used to append total amount raised to the back side of the
// card with progressBarComponent function.
const giftTotalContainer = document.querySelector(".gift-total-container");

function progressBarComponent(data) {
  // Find the sum of the total amount raised in the challenge
  const totalAmountRaised = data.reduce((cumulator, nextValue) => {
    return cumulator + nextValue.amount;
  }, 0);

  // Find the percentage away from reaching target challenge amount
  const totalDonors = data.length;
  let donationPercentage = Number((totalAmountRaised / 25000).toFixed(3)) * 100;

  const progressBarContainer = document.createElement("div");
  const progressHeader = document.createElement("div");
  const percentContent = document.createElement("p");
  const numberDonors = document.createElement("p");
  const progressBar = document.createElement("progress");
  const progressSubHeader = document.createElement("div");
  const activeCaption = document.createElement("p");
  const DonationSumContainer = document.createElement("div");
  const totalSumDonations = document.createElement("p");
  const donationCaption = document.createElement("p");

  // appending the node tree structure (progress-bar-container)
  progressBarContainer.appendChild(progressHeader);
  progressBarContainer.appendChild(progressBar);
  progressBarContainer.appendChild(progressSubHeader);

  // (progress-header)
  progressHeader.appendChild(percentContent);
  progressHeader.appendChild(numberDonors);

  // (progress-subheader)
  progressSubHeader.appendChild(activeCaption);
  progressSubHeader.appendChild(DonationSumContainer);
  DonationSumContainer.appendChild(totalSumDonations);
  DonationSumContainer.appendChild(donationCaption);

  // adding classNames and attributes
  progressBarContainer.className = "progress-bar-container";
  progressHeader.className = "progress-header";
  progressSubHeader.className = "progress-subheader";
  DonationSumContainer.className = "donation-sum-container";

  // adding content to paragraph tags:
  percentContent.textContent = `${donationPercentage}%`;
  numberDonors.textContent = `${totalDonors} Donors`;
  totalSumDonations.textContent = `$${Number(
    totalAmountRaised
  ).toLocaleString()}`;
  donationCaption.textContent = "Donated";
  activeCaption.textContent = "Active";

  // progress bar attributes
  progressBar.max = 25000;
  progressBar.value = totalAmountRaised;

  // console.log("progressBarComponent dom element", progressBarContainer);
  // console.log("progress bar html element", progressBar);

  // append the built out component to the className challenge-details
  // div layer
  challengeDetails.appendChild(progressBarContainer);

  // append totalSumDonations dom element to the gift-total-container div
  // layer
  const backSideAmount = document.createElement("p");
  backSideAmount.textContent = `$${Number(totalAmountRaised).toLocaleString()}`;
  giftTotalContainer.appendChild(backSideAmount);
}

/* 
table JavaScript Component:
html structure

<table>
  <tr>
    <th>Donor</th>
    <th>Dollars</th>
    <th>Type</th>
  <tr>
  <tr>
    <td>name</td>
    <td>amount</td>
    <td>type</td>
  <tr>
    ....
<table>
*/

const donorTableContainer = document.querySelector(".donor-table-container");

function tableComponent(data) {
  // create table element and header elements
  const tableElement = document.createElement("table");
  const donorRow = document.createElement("tr");
  const donorHeader = document.createElement("th");
  const dollarsHeader = document.createElement("th");
  const typeHeader = document.createElement("th");

  // Append header elements to the table element
  tableElement.appendChild(donorRow);
  donorRow.appendChild(donorHeader);
  donorRow.appendChild(dollarsHeader);
  donorRow.appendChild(typeHeader);

  // create the content for the table header elements
  donorHeader.textContent = "Donor";
  dollarsHeader.textContent = "Dollars";
  typeHeader.textContent = "Type";

  console.log(tableElement);

  // Append the table and table headers to donor-table-container
  // div layer
  donorTableContainer.appendChild(tableElement);

  // sort passed in array by ascentding order of amount
  data.sort((a, b) => {
    return b.amount - a.amount;
  });

  // Create a loop that will loop through data and create dom elements
  // for each indexes name, amount, and type data
  data.forEach((donorData) => {
    // create <tr> and <td> dom elements for each index position
    var rowElement = document.createElement("tr");
    var nameElement = document.createElement("td");
    var amountElement = document.createElement("td");
    var typeElement = document.createElement("td");

    rowElement.appendChild(nameElement);
    rowElement.appendChild(amountElement);
    rowElement.appendChild(typeElement);

    nameElement.textContent = donorData.name;
    amountElement.textContent = `$${donorData.amount}`;
    typeElement.textContent = donorData.type;

    tableElement.appendChild(rowElement);
  });
}

// Create an onclick event listener that will transform the parent
// flip-card div layer by 180 degrees (thus allowing the user to view
// both the backside and frontside of the card)
const flipCardContainer = document.querySelector(".flip-card-container");

const flipClickHandler = function () {
  let flipCard = document.querySelector(".flip-card");
  console.log("flip-card class names", flipCard.classList);
  if (flipCard.className === "flip-card") {
    flipCard.classList.add("click-flip");
  } else {
    flipCard.classList.remove("click-flip");
  }
};

flipCardContainer.addEventListener("click", flipClickHandler);

// ajax call to the donors.json file.
axios
  .get("./donors.json")
  .then((response) => {
    progressBarComponent(response.data);
    tableComponent(response.data);
  })
  .catch((error) => {
    console.log("error from the ajax call", error);
    console.log(
      "Make sure to run the index.html file on a local server. I used the npm package http-server"
    );
  });
