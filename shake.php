<?php 
  if(!isset($_POST['employeeCode'])){
    header('Location: register.php');
  } 
?>
<?php include("./header.php"); ?>
  <input type="hidden" id="employeeCode" name="employeeCode" value="<?= trim($_POST['employeeCode']) ?>" />
  <div class="row pt-5">
    <div class="col-12">
      <div class="card shadow p-2" style="border-radius:20px 20px;">
        <div class="card-body">
          <div id="color_label">
            <h2 class="font-weight-bold text-center" id="status_label"></h2>
            <div class="text-center row">
              <div class="col-12 pt-3">
                <div class="display-3" id="current_score">...</div><br/>
                <h4 id="score_label" class="font-weight-bold">คะแนน</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <script src="./app.js"></script> -->
  <script src="./shake.js"></script>
<?php include("./footer.php"); ?>