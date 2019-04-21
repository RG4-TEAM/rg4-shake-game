window.onload = function() {
  if (!("ondevicemotion" in window)) {
    alert("Not Supported");
    return;
  }
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyClqdcIesbEXvCJ_hRNUYXZHB-CE4qGWZw",
    authDomain: "rg4-shake-game.firebaseapp.com",
    databaseURL: "https://rg4-shake-game.firebaseio.com",
    projectId: "rg4-shake-game",
    storageBucket: "rg4-shake-game.appspot.com",
    messagingSenderId: "775928587897"
  };
  firebase.initializeApp(config);
};
