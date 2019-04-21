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

  $("[name=statusRadio]").on("click", function() {
    var selectedStatus = $(this).val();
    if (selectedStatus == "completed") {
      goalScoreRef.once("value").then(function(dataSnapshot) {
        var goalScore = dataSnapshot.val();
        firebase
          .database()
          .ref("currentScore")
          .set(goalScore);
      });
    }
    firebase
      .database()
      .ref("status")
      .set(selectedStatus);
  });

  // onload
  var statusRef = firebase.database().ref("status");
  statusRef.once("value").then(function(dataSnapshot) {
    var status = dataSnapshot.val();
    $("input[name='statusRadio'][value=" + status + "]").attr(
      "checked",
      "checked"
    );
  });
  statusRef.on("value", function(dataSnapshot) {
    var status = dataSnapshot.val();
    $("input[name='statusRadio'][value=" + status + "]").attr(
      "checked",
      "checked"
    );
  });

  //onload goal score
  var goalScoreRef = firebase.database().ref("goalScore");
  goalScoreRef.once("value").then(function(dataSnapshot) {
    var goalScore = dataSnapshot.val();
    $("#goalScore").val(goalScore);
    $("#progress-bar").attr("aria-valuemax", goalScore);
  });
  goalScoreRef.on("value", function(dataSnapshot) {
    var goalScore = dataSnapshot.val();
    $("#goalScore").val(goalScore);
    $("#progress-bar").attr("aria-valuemax", goalScore);
  });

  // onload current score
  var currentScoreRef = firebase.database().ref("currentScore");
  currentScoreRef.once("value").then(function(currentScoreSnapshot) {
    var currentScore = currentScoreSnapshot.val();
    firebase
      .database()
      .ref("goalScore")
      .once("value")
      .then(function(goalSnapshot) {
        var goalScore = goalSnapshot.val();
        var percentage = parseInt((currentScore * 100) / goalScore);
        $("#progress-bar").css("width", percentage + "%");
      });
  });
  currentScoreRef.on("value", function(currentScoreSnapshot) {
    var currentScore = currentScoreSnapshot.val();
    firebase
      .database()
      .ref("goalScore")
      .once("value")
      .then(function(goalSnapshot) {
        var goalScore = goalSnapshot.val();
        var percentage = parseInt((currentScore * 100) / goalScore);
        var className;
        $("#progress-bar").css("width", percentage + "%");
      });
  });

  // onload number of player
  var usersRef = firebase.database().ref("Users");
  usersRef.once("value").then(function(usersSnapshot) {
    $("#numberOfPlayer").text(usersSnapshot.numChildren());
  });
  usersRef.on("value", function(usersSnapshot) {
    $("#numberOfPlayer").text(usersSnapshot.numChildren());
  });

  // btn event
  $("#goalScore-addon-btn").click(function() {
    var currentGoalScore = parseInt($("#goalScore").val());
    firebase
      .database()
      .ref("goalScore")
      .set(currentGoalScore)
      .then(function() {
        alert("แก้ไขค่าเป้าหมายเรียบร้อยแล้ว");
      })
      .catch(function(error) {
        alert("ไม่สามารถบันทึกได้เนื่องจาก " + JSON.stringify(error));
      });
  });

  $("#resetCurrentScore").click(function() {
    firebase
      .database()
      .ref("Users")
      .once("value")
      .then(function(usersSnapshot) {
        usersSnapshot.forEach(function(userSnapshot) {
          userSnapshot.ref.child("score").set(0);
        });
      })
      .catch(function(error) {
        alert("ไม่สามารถรีเซตคะแนนทั้งหมดได้...");
      });
  });

  $("#removeAllUser").click(function() {
    if (confirm("คุณแน่ใจหรือไม่ที่ต้องการเคลียร์ข้อมูลผู้ใช้ทั้งหมด ?")) {
      firebase
        .database()
        .ref("Users")
        .remove()
        .then(function() {
          alert("ลบข้อมูลผู้ลงทะเบียนทั้งหมดเรียบร้อยแล้ว");
        })
        .catch(function(error) {
          alert("การลบข้อมูลเกิดข้อผิดพลาด " + error.message);
        });
    }
  });
};
