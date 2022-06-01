"use strict"

class Gamburger {
  propertyList = [
    {name: 'big', cost: 100, calories: 40},
    {name: 'small', cost: 50, calories: 20},
    {name: 'cheese', cost: 10, calories: 20},
    {name: 'salad', cost: 20, calories: 5},
    {name: 'potato', cost: 15, calories: 10},
    {name: 'seasoning', cost: 15, calories: 0},
    {name: 'mayonnaise', cost: 20, calories: 5}
  ];

  choosedBurger = [];

  chooseSize(value) {
    if(value === 'big') {
      this.chooseProperty('big');
      this.deliteProperty('small');
    } else {
      this.chooseProperty('small');
      this.deliteProperty('big');
    }
  }

  chooseProperty(value) {
    this.propertyList.forEach(element => {
      if(value === element.name) {
        this.choosedBurger.push(element)
      }
    });
    this.getCost();
    this.getCalories();
  }

  deliteProperty(value) {
    this.choosedBurger.forEach((element, index) => {
      if(value === element.name) {
        this.choosedBurger.splice(index, 1)
      }
    });
    this.getCost();
    this.getCalories();
  }

  getCost() {
    return new Promise(resolve => resolve(
      this.choosedBurger.reduce(((sum, {cost}) => sum + cost), 0)
    ))
    .then(this.showCost)
  }

  getCalories() {
    return new Promise(resolve => resolve(
      this.choosedBurger.reduce(((sum, {calories}) => sum + calories), 0)
    ))
    .then(this.showCalories)
  }

  showCost(cost) {
    document.querySelector('.cost').innerHTML = `${cost} руб.`
  }

  showCalories(calories) {
    document.querySelector('.calories').innerHTML = `${calories} ккал`
  }

  reset() {
    this.choosedBurger = [];
    this.getCost();
    this.getCalories();
  }
}

const gamburger = new Gamburger();

document.querySelector('.chooseSize').addEventListener('change', (event) => {
  let value = event.target.value;
  if(event.target.checked) {
    gamburger.chooseSize(value);
  }
});

document.querySelector('.chooseStuffings').addEventListener('change', (event) => {
  let value = event.target.value;
  event.target.checked ? gamburger.chooseProperty(value) : gamburger.deliteProperty(value);
});

document.addEventListener('reset', (event) => {
  gamburger.reset()
})