<?php include("./header.php"); ?>
  <input type="hidden" id="employeeCode" name="employeeCode" value="<?= trim($_POST['employeeCode']) ?>" />
  <div class="row pt-5">
    <div class="col-12">
      <div class="card shadow-sm p-2" style="border-radius:20px 20px;">
        <div class="card-body">
            <h2 class="font-weight-bold text-center">Shaking game config</h2>
            <div class="text-center row pt-3">
              <div class="col-12">
                <div class="mb-3 font-weight-bold" style="font-size:30px">
                  เข้าร่วมแล้ว <span id="numberOfPlayer"> ... </span> คน
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="inactiveRadio" name="statusRadio" value="inactive" class="custom-control-input">
                  <label class="custom-control-label" for="inactiveRadio">ยังไม่ให้เขย่า</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="activeRadio" name="statusRadio" value="active" class="custom-control-input">
                  <label class="custom-control-label" for="activeRadio">เขย่า</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="completedRadio" name="statusRadio" value="completed" class="custom-control-input">
                  <label class="custom-control-label" for="completedRadio">เปิดใช้งาน</label>
                </div>
                <!-- <div class="input-group mb-3 mt-3"> -->
                <h5 class="mt-3 font-weight-bold">สถานะข้อมูลปัจจุบัน</h5>
                <div class="progress mb-3">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" id="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="1000" ></div>
                </div>
                <!-- </div> -->
                <h5 class="mt-3 font-weight-bold">กำหนดค่าเป้าหมาย</h5>
                <div class="input-group mb-3">
                  <input type="number" class="text-center form-control" id="goalScore" aria-describedby="goalScore-addon-btn">
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="goalScore-addon-btn">อัพเดทค่าเป้าหมาย</button>
                  </div>
                </div>
                <div class="input-group mb-3 text-center">
                  <button type="button" class="btn btn-primary btn-lg" id="resetCurrentScore" name="resetCurrentScore">รีเซตค่าคะแนนทุกคนเป็น 0</button>
                  <button type="button" class="btn btn-danger btn-lg" id="removeAllUser" name="resremoveAllUser">ลบผู้ใช้ทั้งหมด</button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <script src="./app.js"></script> -->
  <script src="./control.js"></script>
<?php include("./footer.php"); ?>