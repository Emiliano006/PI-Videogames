const validations = (gameData) => {
  const errors = {};

  if (!gameData.name.length) {
    errors.name = "This field can not be blank";
  } else if (gameData.name.length < 5 || gameData.name.length > 15) {
    errors.name = "his field must be a number between 5 and 15";
  }

  if (!gameData.description.length) {
    errors.description = "This field can not be blank";
  } else if (gameData.description.length < 20 || gameData.description.length > 400) {
    errors.description = "This field must be a number between 20 and 400";
  }

  if (
    gameData.image !== "" &&
    !/^https?:\/\/\S+$/.test(gameData.image)
  ) {
    errors.image = "This field must be a valid URL";
  }

  if (!gameData.released.length) {
    errors.released = "This field can not be blank";
  }

  if (!gameData.rating.length) {
    errors.rating = "This field can not be blank";
  } else if (isNaN(parseFloat(gameData.rating))) {
    errors.rating = "It must be a number";
  } else if (
    parseFloat(gameData.rating) < 0 ||
    parseFloat(gameData.rating) > 5
  ) {
    errors.rating = "Must be a number between 0 and 5";
  }

  if (!gameData.platforms.length) {
    errors.platforms = "This field cannot be blank";
  } else if (!["pc", "play station", "xbox", "linux", "macos", "nintendo switch", "android"].includes(gameData.platforms.toLowerCase())) {
    errors.platforms = "This field must be a valid platform";
  }

  if (!gameData.genres.length) {
    errors.genres = "You must choose at least one genres";
  }

  return errors;
};

export default validations;





