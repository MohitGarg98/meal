const express = require("express");
const router = express.Router();
const LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
const Meal = require('../models/meal');
let mealData = require('../dishes.json');
mealData = mealData.dishes;

router.get("/", function (req, res) {
  res.render("step1");
});

router.post("/", function (req, res) {
  const meal = localStorage.getItem("meal");
  const no_of_people = localStorage.getItem("no_of_people");
  const restaurant = localStorage.getItem("restaurant");
  let dish = localStorage.getItem("dish");
  dish = dish.split(",");
  let no_of_serve = localStorage.getItem("no_of_serve");
  no_of_serve = JSON.parse("[" + no_of_serve + "]");

  Meal.create({
    meal, no_of_people, restaurant, dish, no_of_serve
  });
  res.render("step1");
});

router.get("/step2", function (req, res) {
  let restaurantArr = [];
  for (let i = 0; i < mealData.length; i++) {
    let restaurant = mealData[i].availableMeals.indexOf(localStorage.getItem("meal"));
    if(restaurant !== -1 && restaurantArr.indexOf(mealData[i].restaurant) === -1){
      restaurantArr.push(mealData[i].restaurant);
    }
  }
  res.render("step2", {restaurantArr});
});

router.post("/step2", async function (req, res) {
  localStorage.setItem("meal", req.body.meal);
  localStorage.setItem("no_of_people", req.body.no_of_people);
  let restaurantArr = [];
  for (let i = 0; i < mealData.length; i++) {
    let restaurant = mealData[i].availableMeals.indexOf(req.body.meal);
    if(restaurant !== -1 && restaurantArr.indexOf(mealData[i].restaurant) === -1){
      restaurantArr.push(mealData[i].restaurant);
    }
  }
  res.render("step2", {restaurantArr});
});

router.get("/step3", function (req, res) {
  let dishArr = [];
  mealData.forEach(dish => {
    if(dish.restaurant === localStorage.getItem("restaurant")){
      dishArr.push(dish.name);
    }
  });
  res.render("step3", {dishArr});
});

router.post("/step3", function (req, res) {
  localStorage.setItem("restaurant", req.body.restaurant);
  let dishArr = [];
  mealData.forEach(dish => {
    if(dish.restaurant === req.body.restaurant){
      dishArr.push(dish.name);
    }
  });
  res.render("step3", {dishArr});
});

router.post("/step4", async function (req, res) {
  localStorage.setItem("dish", req.body.dish);
  localStorage.setItem("no_of_serve", req.body.no_of_serve);
  const meal = localStorage.getItem("meal");
  const no_of_people = localStorage.getItem("no_of_people");
  const restaurant = localStorage.getItem("restaurant");
  let dish = localStorage.getItem("dish");
  dish = dish.split(",");
  let no_of_serve = localStorage.getItem("no_of_serve");
  no_of_serve = JSON.parse("[" + no_of_serve + "]");
  var dishArr = [];
  for (let i = 0; i < dish.length; i++) {
    var dishName = dish[i]+" - "+no_of_serve[i];
    dishArr.push(dishName);
  }
  const review = {
    dishArr,
    meal,
    no_of_people,
    restaurant
  }
  res.render("step4", {review});
});

module.exports = router;