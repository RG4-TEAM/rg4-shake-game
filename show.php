<?php include("./header.php"); ?>
  <input type="hidden" id="employeeCode" name="employeeCode" value="<?= trim($_POST['employeeCode']) ?>" />
  <div class="row pt-5">
    <div class="col-12">
      <div class="card shadow p-2" style="border-radius:20px 20px;">
        <div class="card-body">
            <h2 class="font-weight-bold text-center" id="status_label">...</h2>
            <div class="text-center row pt-3">
              <div class="col-10">
                <h1 class="mt-3 offset-2 font-weight-bold" id="percentage_label">%</h1>
                <div class="progress offset-2 mb-3">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" id="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="1000" ></div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <script src="./app.js"></script> -->
  <script src="./show.js"></script>
<?php include("./footer.php"); ?>