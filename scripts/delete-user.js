const { client } = require('../lib/sanity');

async function deleteUserByEmail(email) {
  try {
    console.log('正在刪除用戶:', email);
    
    // 1. 查找用戶
    const userQuery = `*[_type == "user" && email == $email][0]`;
    const user = await client.fetch(userQuery, { email });
    
    if (!user) {
      console.log('找不到用戶:', email);
      return;
    }
    
    console.log('找到用戶:', user._id);
    
    // 2. 查找相關的審核記錄
    const approvalQuery = `*[_type == "userApproval" && user._ref == $userId][0]`;
    const approval = await client.fetch(approvalQuery, { userId: user._id });
    
    // 3. 創建事務
    const transaction = client.transaction();
    
    // 4. 刪除用戶
    console.log('刪除用戶:', user._id);
    transaction.delete(user._id);
    
    // 5. 如果找到審核記錄，也一併刪除
    if (approval) {
      console.log('刪除審核記錄:', approval._id);
      transaction.delete(approval._id);
    } else {
      console.log('找不到相關的審核記錄');
    }
    
    // 6. 提交事務
    const result = await transaction.commit();
    console.log('刪除成功:', result);
    
  } catch (error) {
    console.error('刪除用戶時出錯:', error);
  }
}

// 執行刪除
deleteUserByEmail('ryan_chwang@yahoo.com.tw');
