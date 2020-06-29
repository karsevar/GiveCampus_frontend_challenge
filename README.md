# GiveCampus Frontend Challenge Documentation

#### 1️⃣ Repository Summary

## Challenge Description:

Project: Build a campaign card front and back using HTML, CSS, and JavaScript.

CSS
Please implement the attached design using HTML and CSS. You may use any css preprocessor such as less, sass, postcss, etc, but do not use a frontend css framework such as bootstrap. This portion of the homework is to assess your experience with writing css.

JavaScript

For the JavaScript portion of the homework, you will be required to use ajax to pull in the included JSON file of donors and load it asynchronously on the back of the campaign card, and then sum the total number of donors and dollars. This portion of the homework is to assess your JavaScript skills and should be done using vanilla JavaScript, without the use of a front-end framework such as React, VueJS or jQuery.

## Solution:

The following implementation uses html, vanilla JavaScript, and vanilla CSS to create the front and back face of the campaign card. Transform and CSS animations were used to simulate a card flipping to the back from the front and to the front from the back using a click event (which is attached to the flip-card-container parent div layer).

Example of the overall html structure of the challenge card user interface:

```
<div class='flip-card-container'>
    <div class='flip-card'>
        <div class='flip-card-front'>
            ...
        </div>
        <div class='flip-card-back'>
            ...
        </div>
    </div>
</div>
```

Referencing the code above, the click event is used to toggle the immediate child of `<div class='flip-card-container'>` (which is `<div class='flip-card-front'>`) between containing the additional class click-flip and not. `<div class='flip-card-back'>` is hidden when the click-flip class is not included in `<div class='flip-card'>` and inversely when the click-flip class is included on `<div class='flip-card'>` `<div class='flip-card-front'>` is hidden.

Example of front and back card presentation:

```
## <div class='flip-card-front'> is shown
<div class='flip-card'>
    ...
</div>

## <div class='flip-card-back'> is shown
<div class='flip-card click-flip'>
    ...
</div>
```

As for the JavaScript component structure and how the ajax data is processed. I used a total of two components:

- The progressBarComponent on line 33 in fetchData.js is used to display and modify the progress bar, percent of targeted amount raised, number of donors, and total amount donated according to the passed in data from donors.json.

- The tableComponent on line 123 in fetchData.js is used to display (in descending order of amount given) the name, amount given, and gift type of each donor object in the passed in array as an html table.

---

## Technologies Used

- Vanilla JavaScript (to manipulate the dom so that the data from donors.json is reflected in index.html)
- Vanilla CSS (for styling the html tags in index.html)
- axios (used to implement the ajax get request to donors.json in the root folder)

---

## 2️⃣ Instructions

Please run index.html through a local server package (like http-server) because the axios ajax call to donors.json won't be able to pull in the data and by extension the progressBarComponent and tableComponent won't mount onto index.html.
