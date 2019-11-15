const pawApp = {};
// detecting transition end
pawApp.endOfAnimations =
  "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
// Tracking times user clicked
pawApp.timesClicked = 0;
// picture source of paws pictures
pawApp.pawsSrc = ["./image/paws/Olives.png"];
// cubic-bezier values for transitions variations
pawApp.cubicBezierArr = [
  "all 0.5s linear",
  "all 2s cubic-bezier(.17,.67,.78,.36)",
  "all 1s cubic-bezier(0,.98,.7,.7)"
];
// transform
pawApp.transformArr = [
  "rotate(90deg) translate(-35vw, 120vw)",
  "translate(0, 50vw)",
  "translate(0, 50vw)"
];
// positions
pawApp.positionsArr = [];

// functions
pawApp.randomNumber = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

pawApp.changePawsCss = () => {
  console.log("triggered changePawsCss");
  $(".paws").css(
    "transition",
    pawApp.cubicBezierArr[0],
    "transform",
    pawApp.transformArr[0]
  );

  // $(".wall").css("z-index", "10"); //stop user interaction
};

pawApp.activatePaws = () => {
  $(".paws")
    .addClass("active")
    .one(pawApp.endOfAnimations, () => {
      console.log("triggered first activatePaws");
      // $(".wall").css("z-index", "10"); //stop user interaction
      $("#lights").prop("checked", false);
      $(".paws").removeClass("active");
      $("body").removeClass("lightsOut");

      // rerun to change css
      $(".paws").one(pawApp.endOfAnimations, () => {
        pawApp.changePawsCss();
        // $(".wall").css("z-index", "0"); // allows user interaction again
        pawApp.normalEvent();
      });
    });
};

// Functions
pawApp.normalEvent = () => {
  $(".lightSwitch").one("click", () => {
    pawApp.activatePaws();
    $("body").addClass("lightsOut");
    // $('#lights').prop('disabled', true)
  });
};

pawApp.init = () => {
  pawApp.normalEvent();
};

$(function() {
  pawApp.init();
});
