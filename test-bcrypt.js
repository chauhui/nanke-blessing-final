const bcrypt = require('bcryptjs');

// 這裡換成你的 Sanity 資料庫裡的 hash
const hash = '$2b$12$42STeI.gnhCLBCVlMUKEVubgguIapmd1a7G9Gfh77C6IxvcFn0tZS';

// 這裡換成你剛剛登入表單輸入的密碼
const plain = 'hd87yyyy';

bcrypt.compare(plain, hash, (err, result) => {
  if (err) throw err;
  console.log(result ? '密碼正確！' : '密碼錯誤');
});
