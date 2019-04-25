<?php include("./header.php"); ?>
  <div class="row pt-5">
    <div class="col-12">
      <div class="card shadow-sm p-2">
        <div class="card-body">
          <div class="text-center">
            <img src="./assets/trans-logo.jpg" class="img-fluid"/>
          </div>
          <h5 class="font-weight-bold text-center">ลงทะเบียนเปิดการใช้งานระบบสารสนเทศ<br/>การไฟฟ้าส่วนภูมิภาคโปร่งใส 2562</h5>
          <div class="text-center row">
            <div class="col-12 pt-3">
              <form method="POST" action="shake.php">
                <input type="number" class="text-center form-control" id="employeeCode" name="employeeCode" placeholder="กรอกรหัสประจำตัวของท่าน" autofocus="true" required />
                <button type="submit" class="m-2 btn btn-success" id="submitEmployeeCode" name="submitEmployeeCode"><i class="fas fa-sign-in-alt"></i> เข้าร่วม</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="./app.js"></script>
<?php include("./footer.php"); ?>