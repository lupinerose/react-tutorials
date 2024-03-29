////////////////////////////////////////////////////////////////////////
////////// The following are extended examples of how to use ///////////
////////// the storestate and changeState functions to create a game ///
////////// based on the power plant prompt from Tuesday's lesson ///////
////////// of React's functional programming week on LHTP.com //////////
////////////////////////////////////////////////////////////////////////



// This function stores our state in an object called currentState. 
// This function also updates the state of our object. It updates state in the inner funciton by calling the stateChangeFunction that we pass into storeState's inner function. The stateChangeFunction refers to the many funcitons we create using the changeState function below to update specific properties in our state object. 
// NOTE: we are passing in a parameter to storeState that sets the initial state, or initial values of the function.
export const storeState = (initialState = {}) => {
  let currentState = initialState;
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

const initialValues = {soil: 4, water: 0, light: 0};
const initialValues2 = {soil: 0, water: 4, light: 0};
const initialValues3 = {soil: 0, water: 0, light: 4};

const fern = storeState(initialValues);
const feed = changeState("soil");
const blueFood = feed(5);
const blueFood = changeState("soil")(5);
const currentState = fern();
const newFernState = fern(blueFood);
console.log(newFernState);
// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.
export const changeNumberState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

export const changeStringState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : value
    })
  }
}

const initialValues = {soil: 0, water: 0, light: 0, plantType: "fern"};
export const changeFernState = (prop) => {
  return (value) => {
    return (state) => {
      if (state.plantType === "fern") {
        return {
        ...state,
        [prop] : (state[prop] || 0) + value
      }} else {
        return state
      }
    }
  }
}



///////////////////////////////////////////
// Creating plants ///////////////////////
/////////////////////////////////////////

// This allows us to create new plants

// === function, that has access to a currentState object
// const stateControl = storeState(initialValues);
const sunFlower = storeState(initialValues);

console.log("just getting my current state", sunFlower());

// We create two functions using our function factory. We could easily create many more.

console.log("add 5 to soil", newFernState);
// newFernState = {soil: 5, light: 0, water: 0}




/////////////////////////////////////////
// Storing and tracking  Game State ////
///////////////////////////////////////

// function that stores our game state
const initialGameValues = { numberOfPlantsAlive: 0, numberOfPlantsDead: 0, playerName: "" };
const gameMaster = storeState(initialGameValues);

//using changeState as our function factory for the game data
const updatePlayerName = changeState("playerName");
const addNewPlayerToName = updatePlayerName("Sandy");
const updatedGameObj = gameMaster(addNewPlayerToName);
// updatedGameObj = { numberOfPlantsAlive: 0, numberOfPlantsDead: 0, playerName: "Sandy" };

const addNewPlant = changeState("numberOfPlantsAlive")(1);
const updatedGameObjAgain = gameMaster(addNewPlant);
// updatedGameObj = { numberOfPlantsAlive: 1, numberOfPlantsDead: 0, playerName: "Sandy" };




/////////////////////////////////////////
// Storing and tracking Weather State //
///////////////////////////////////////

// function that stores our plant environment state
const initialWeatherValues = {wind: 2, sunCover: 8, rain: 0, storm: false, overcast: false, cloudCover: 2};
const weatherChanger = storeState(initialWeatherValues);

// using changeState as our function factory for the plant environemnt data
const hereComesTheStorm = changeState("storm")(true);
const theStormIsHere = weatherChanger(hereComesTheStorm);
// theStormIsHere = {wind: 2, sunCover: 8, rain: 0, storm: true, overcast: false, cloudCover: 2};



/////////////////////////////////////////
// Weather events affecting plants /////
///////////////////////////////////////

// If we want the storm to affect a plant's state, we need to create a changeState method that does that
const theStormHurtsMe = feed(-10);
const fernAffectedByTheStorm = fern(theStormHurtsMe);
// fernAffectedByTheStorm = {soil: -5, light: 0, water: 0}