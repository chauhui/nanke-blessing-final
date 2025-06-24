import React from 'react';
import { Button, Card, Container, Flex, Stack, Text } from '@sanity/ui';

export const userSyncPlugin = () => ({
  name: 'user-sync',
  tools: [
    {
      name: 'sync-users',
      title: '同步用戶',
      component: SyncUsers,
      icon: () => '🔄',
    },
  ],
});

function SyncUsers() {
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const syncUsers = async () => {
    setIsSyncing(true);
    setMessage('正在同步用戶...');
    
    try {
      // 使用相對路徑調用 API
      const response = await fetch('/api/users');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const users = await response.json();
      
      // 這裡應該添加將用戶同步到 Sanity 的邏輯
      // 注意：在實際應用中，您需要實現這個邏輯
      
      setMessage(`成功獲取 ${users.length} 個用戶，請在後續步驟中實現同步邏輯`);
    } catch (error) {
      console.error('同步用戶失敗:', error);
      setMessage(`同步失敗: ${error.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Text size={4} weight="bold">用戶同步</Text>
        <Text>點擊按鈕從數據庫同步用戶到 Sanity</Text>
        
        <Flex gap={2}>
          <Button 
            text="同步用戶" 
            tone="primary"
            onClick={syncUsers}
            disabled={isSyncing}
            loading={isSyncing}
          />
        </Flex>
        
        {message && (
          <Card padding={3} radius={2} shadow={1} tone={message.includes('失敗') ? 'critical' : 'positive'}>
            <Text>{message}</Text>
          </Card>
        )}
      </Stack>
    </Card>
  );
}
