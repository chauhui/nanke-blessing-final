// studio/components/GroupedRegistrations.tsx
import React, { useEffect, useState } from 'react';
import { useClient } from 'sanity';
import { Card, Stack, Text, Button, Flex, Box, Badge } from '@sanity/ui';

interface Event {
  _id: string;
  title: string;
  date: string;
  location?: string;
}

interface Registration {
  _id: string;
  _createdAt: string;
  name: string;
  email: string;
  phone?: string;
  note?: string;
  event: Event | null;
  registeredAt: string;
}

export default function GroupedRegistrations() {
  const client = useClient();
  const [groupedRegistrations, setGroupedRegistrations] = useState<Record<string, { event: Event; registrations: Registration[] }>>({});
  const [loading, setLoading] = useState(true);
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. 獲取所有報名記錄
        const registrations = await client.fetch<Registration[]>(
          `*[_type == "registration"] | order(_createdAt desc) {
            _id,
            _createdAt,
            name,
            email,
            phone,
            note,
            event->{
              _id,
              title,
              date,
              location
            },
            registeredAt
          }`
        );

        // 2. 按活動分組
        const grouped = registrations.reduce<Record<string, { event: Event; registrations: Registration[] }>>((acc, reg) => {
          if (!reg.event) return acc;
          
          const eventId = reg.event._id;
          if (!acc[eventId]) {
            acc[eventId] = {
              event: reg.event,
              registrations: []
            };
          }
          acc[eventId].registrations.push(reg);
          return acc;
        }, {} as Record<string, { event: Event; registrations: Registration[] }>);

        setGroupedRegistrations(grouped);
        
        // 3. 初始化所有活動為折疊狀態
        const initialExpandedState = Object.keys(grouped).reduce<Record<string, boolean>>((acc, eventId) => {
          acc[eventId] = false;
          return acc;
        }, {});
        setExpandedEvents(initialExpandedState);
        
      } catch (error) {
        console.error('Error fetching registrations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [client]);

  const toggleEvent = (eventId: string) => {
    setExpandedEvents(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Card padding={4}>
        <Text>載入中...</Text>
      </Card>
    );
  }

  if (Object.keys(groupedRegistrations).length === 0) {
    return (
      <Card padding={4}>
        <Text>目前沒有報名記錄</Text>
      </Card>
    );
  }

  return (
    <Stack space={4}>
      <Card padding={3} shadow={1} radius={2} style={{ marginBottom: '1rem' }}>
        <Flex justify="space-between" align="center">
          <Text weight="semibold">總活動數: {Object.keys(groupedRegistrations).length}</Text>
          <Text weight="semibold">
            總報名人數: {Object.values(groupedRegistrations).reduce((sum, group) => sum + group.registrations.length, 0)}
          </Text>
        </Flex>
      </Card>

      {Object.entries(groupedRegistrations)
        .sort(([_, a], [__, b]) => new Date(b.event.date).getTime() - new Date(a.event.date).getTime())
        .map(([eventId, { event, registrations }]) => (
          <Card key={eventId} shadow={1} radius={2}>
            <Button
              onClick={() => toggleEvent(eventId)}
              mode="bleed"
              style={{ width: '100%', textAlign: 'left' }}
              padding={3}
            >
              <Flex justify="space-between" align="center">
                <Text weight="semibold">{event.title}</Text>
                <Flex align="center" gap={2}>
                  <Badge tone="primary">{registrations.length} 人</Badge>
                  <Text size={1} muted>
                    {expandedEvents[eventId] ? '收起' : '展開'}
                  </Text>
                </Flex>
              </Flex>
              <Box marginTop={1}>
                <Text size={1} muted>
                  {event.date ? new Date(event.date).toLocaleDateString('zh-TW') : '無日期'}
                  {event.location ? ` · ${event.location}` : ''}
                </Text>
              </Box>
            </Button>
            
            {expandedEvents[eventId] && (
              <Box padding={3} style={{ borderTop: '1px solid #eaeaea' }}>
                {registrations.map((reg) => (
                  <Card key={reg._id} marginBottom={3} padding={3} border radius={1}>
                    <Flex justify="space-between" align="flex-start">
                      <Stack space={2} style={{ flex: 1 }}>
                        <Box>
                          <Text weight="semibold" size={2}>{reg.name}</Text>
                        </Box>
                        <Box>
                          <Text size={1} style={{ lineHeight: '1.4' }}>{reg.email}</Text>
                        </Box>
                        {reg.phone && (
                          <Box>
                            <Text size={1} style={{ lineHeight: '1.4' }}>電話: {reg.phone}</Text>
                          </Box>
                        )}
                      </Stack>
                      <Box marginLeft={2}>
                        <Text size={1} muted style={{ whiteSpace: 'nowrap' }}>
                          {formatDate(reg.registeredAt || reg._createdAt)}
                        </Text>
                      </Box>
                    </Flex>
                    {reg.note && (
                      <Box 
                        marginTop={3} 
                        padding={3} 
                        style={{ 
                          backgroundColor: '#f8f9fa', 
                          borderRadius: '4px',
                          borderLeft: '3px solid #2276fc'
                        }}
                      >
                        <Text size={1} style={{ lineHeight: '1.5' }}>{reg.note}</Text>
                      </Box>
                    )}
                  </Card>
                ))}
              </Box>
            )}
          </Card>
        ))}
    </Stack>
  );
}
