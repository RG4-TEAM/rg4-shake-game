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

  // onload
  var statusRef = firebase.database().ref("status");
  statusRef.once("value").then(function(dataSnapshot) {
    var status = dataSnapshot.val();
    if (status == "inactive") {
      $("#status_label").removeAttr("class");
      $("#status_label").addClass("font-weight-bold text-center text-warning");
      $("#status_label").text("กรุณารอสักครู่ครับ");
      $("#progress-bar").removeClass("bg-success bg-primary bg-danger");
      $("#progress-bar").addClass("bg-danger");
    } else if (status == "active") {
      $("#status_label").removeAttr("class");
      $("#status_label").addClass("font-weight-bold text-center text-primary");
      $("#status_label").text("เขย่ามือถือของท่านเพื่อเปิดใช้งาน");
      $("#progress-bar").removeClass("bg-success bg-primary bg-danger");
      $("#progress-bar").addClass("bg-primary");
    } else if (status == "completed") {
      $("#status_label").removeAttr("class");
      $("#status_label").addClass("font-weight-bold text-center text-success");
      $("#status_label").text("เปิดการใช้งานระบบสารสนเทศฯ เรียบร้อยแล้ว...");
      $("#progress-bar").removeClass("bg-success bg-primary bg-danger");
      $("#progress-bar").addClass("bg-success");
    }
  });
  statusRef.on("value", function(dataSnapshot) {
    var status = dataSnapshot.val();
    if (status == "inactive") {
      $("#status_label").removeAttr("class");
      $("#status_label").addClass("font-weight-bold text-center text-warning");
      $("#status_label").text("กรุณารอสักครู่ครับ");
      $("#progress-bar").removeClass("bg-success bg-primary bg-danger");
      $("#progress-bar").addClass("bg-danger");
    } else if (status == "active") {
      $("#status_label").removeAttr("class");
      $("#status_label").addClass("font-weight-bold text-center text-primary");
      $("#status_label").text("เขย่ามือถือของท่านเพื่อเปิดใช้งาน");
      $("#progress-bar").removeClass("bg-success bg-primary bg-danger");
      $("#progress-bar").addClass("bg-danger");
    } else if (status == "completed") {
      $("#status_label").removeAttr("class");
      $("#status_label").addClass("font-weight-bold text-center text-success");
      $("#status_label").text("เปิดการใช้งานระบบสารสนเทศฯ เรียบร้อยแล้ว...");
      $("#progress-bar").removeClass("bg-success bg-primary bg-danger");
      $("#progress-bar").addClass("bg-success");
      // timeout to fadeOut
      $("body").fadeOut(2200);
      setTimeout(function() {
        window.location.href = "video.php";
      }, 2000);
    }
  });

  //onload goal score
  var goalScoreRef = firebase.database().ref("goalScore");
  goalScoreRef.once("value").then(function(dataSnapshot) {
    var goalScore = dataSnapshot.val();
    $("#progress-bar").attr("aria-valuemax", goalScore);
  });

  // onload current score
  var currentScoreRef = firebase.database().ref("currentScore");
  currentScoreRef.once("value").then(function(currentScoreSnapshot) {
    var currentScore = currentScoreSnapshot.val();
    if (currentScore == 0) {
      $("#progress-bar").css("width", "0%");
      $("#percentage_label").text("0%");
      return;
    }
    firebase
      .database()
      .ref("goalScore")
      .once("value")
      .then(function(goalSnapshot) {
        var goalScore = goalSnapshot.val();
        var percentage = parseInt((currentScore * 100) / goalScore);
        $("#progress-bar").css("width", percentage + "%");
        $("#percentage_label").text(percentage + "%");
        if (percentage >= 79) {
          $("#progress-bar").css("width", "100%");
          $("#percentage_label").text("100%");
          firebase
            .database()
            .ref("status")
            .set("completed");
        }
      });
  });
  currentScoreRef.on("value", function(currentScoreSnapshot) {
    var currentScore = currentScoreSnapshot.val();
    if (currentScore == 0) {
      $("#progress-bar").css("width", "0%");
      $("#percentage_label").text("0%");
      return;
    }
    firebase
      .database()
      .ref("goalScore")
      .once("value")
      .then(function(goalSnapshot) {
        var goalScore = goalSnapshot.val();
        var percentage = parseInt((currentScore * 100) / goalScore);
        $("#progress-bar").css("width", percentage + "%");
        $("#percentage_label").text(percentage + "%");
        if (percentage >= 80) {
          $("#progress-bar").css("width", "100%");
          $("#percentage_label").text("100%");
          firebase
            .database()
            .ref("status")
            .set("completed");
        }
      });
  });

  // track change users node
  var usersRef = firebase.database().ref("/Users");
  usersRef.on("value", function(usersSnapshot) {
    var summationScore = 0;
    usersSnapshot.forEach(function(user) {
      summationScore += user.val()["score"];
    });
    firebase
      .database()
      .ref("currentScore")
      .set(summationScore);
  });
};
