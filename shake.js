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

  // initial users data
  var employeeCode = $("#employeeCode").val();
  var usersRef = firebase.database().ref("/Users");
  usersRef
    .child(employeeCode)
    .child("registeredAt")
    .set(firebase.database.ServerValue.TIMESTAMP);
  usersRef.once("value").then(function(dataSnapshot) {
    if (!dataSnapshot.child(employeeCode).hasChild("score")) {
      $("#current_score").text(0);
      dataSnapshot.child(employeeCode + "/score").ref.set(0);
      return;
    }
    var score = dataSnapshot.child(employeeCode + "/score").val();
    $("#current_score").text(score);
  });
  usersRef.child(employeeCode + "/score").on("value", function(dataSnapshot) {
    var currentScore = dataSnapshot.val();
    $("#current_score").text(currentScore);
  });

  // listener game start
  var statusRef = firebase.database().ref("status");
  statusRef.on("value", function(dataSnapshot) {
    var status = dataSnapshot.val();
    if (status == "active") {
      $("#status_label").text("เขย่าได้เลย...");
      $("#color_label").removeAttr("class");
      $("#color_label").addClass("text-primary");
      $("#current_score").show();
      $("#score_label").show();
    } else if (status == "inactive") {
      $("#status_label").text("รอสักครู่ครับ");
      $("#color_label").removeAttr("class");
      $("#color_label").addClass("text-danger");
      $("#current_score").show();
      $("#score_label").show();
    } else if (status == "completed") {
      completeLabel();
    }
  });

  // listener shaking event
  var shakeEvent = new Shake({ threshold: 15 });
  shakeEvent.start();
  window.addEventListener(
    "shake",
    function() {
      statusRef.once("value").then(function(dataSnapshot) {
        var status = dataSnapshot.val();
        if (status == "inactive") {
          alert("กรุณารอสักครู่ครับ...");
          return;
        }

        if (status == "active") {
          usersRef
            .child(employeeCode + "/score")
            .once("value")
            .then(function(dataSnapshot) {
              var currentScore = dataSnapshot.val();
              var randomScore = parseInt(Math.random() * 10 + 1);
              dataSnapshot.ref.set(currentScore + randomScore);
              $("#current_score").text(currentScore + randomScore);
            });
        }

        if (status == "completed") {
          completeLabel();
        }
      });
    },
    false
  );

  //stop listening
  function stopShake() {
    shakeEvent.stop();
  }

  function completeLabel() {
    $("#status_label").html(
      '<i class="fas fa-check-circle"></i><br/> เปิดการใช้งานระบบฯ เรียบร้อยแล้ว'
    );
    $("#color_label")
      .removeAttr("class")
      .addClass("text-success");
    $("#current_score").hide();
    $("#score_label").hide();
  }
};
