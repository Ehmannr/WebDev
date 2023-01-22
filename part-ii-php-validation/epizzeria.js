/**
 * CS 310
 * Lab 10 (Regex and Form Validation)
 * Starter JS for E-Pizzeria exercise
 */
(function() {
  "use strict";
  const URL = "http://localhost/cs310/Finished_labs/pizza/part-ii-php-validation/epizzeria.php";

  // sets up validation checker to send a POST request to your
  // epizzeria.php file
  window.addEventListener("load", init);

  function init(){
    id("submit").addEventListener("click", function(){
      validateOrder();
    })
  }

  function validateOrder() {
    let toppings = getToppings();
    let cheeses = getCheeses();
    let crust = qs("input[name='crust']:checked").value;
    let sauce = qs("input[name='sauce']:checked").value;
    let size = qs("input[name='size']:checked").value;

    let params = new FormData();
    params.append("tip", id("tip").value);
    params.append("address", id("address").value);
    params.append("city", id("city").value);
    params.append("state", id("state").value);
    params.append("toppings", toppings);
    params.append("cheeses", cheeses);
    params.append("crust", crust);
    params.append("sauce", sauce);
    params.append("size", size);

    fetch(URL, {method: "POST", body: params})
    .then(checkStatus)
    .then(resp => {
      id("order-results").innerText = resp;
    })
    .catch(msg => {
      id("order-results").innerText = msg;
    });
  }


  function getCheeses() {
    let arr = [];
    let selectedCheeses = qsa("input[name='cheese']:checked");
    for (let i = 0; i < selectedCheeses.length; i++) {
      arr.push(selectedCheeses[i].value);
    }
    return arr;
  }

  function getToppings() {
    var arr = [];
    var selectedToppings = qsa("input[name='topping']:checked");
    for (var i = 0; i < selectedToppings.length; i++) {
      arr.push(selectedToppings[i].value);
    }
    return arr;
  }


  // ------------------------- Helper Functions ------------------------- //
  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @returns {object} - valid result text if response was successful, otherwise rejected
   *                     Promise result
   */
  function checkStatus(response) {
    if (response.ok) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();
