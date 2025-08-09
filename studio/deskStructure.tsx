import React from 'react';
import GroupReportStatsTool from './components/GroupReportStatsTool';
import RegistrationBulkDeleteTool from './components/RegistrationBulkDeleteTool';
import GroupedRegistrations from './components/GroupedRegistrations';
import DonationStatsTool from './components/DonationStatsTool';
// 新增網站流量統計
import PageViewStatsTool from './components/PageViewStatsTool';

export const structure = (S: any) => {
  const userRegistrationListItem = S.listItem()
    .title('用戶註冊')
    .id('user-registration')
    .child(
      S.documentList()
        .id('user-registration-list')
        .title('用戶註冊')
        .schemaType('userRegistration')
        .filter('_type == "userRegistration"')
        .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        .child((docId: string) =>
          S.document()
            .schemaType('userRegistration')
            .documentId(docId)
        )
    );

  const registrationListItem = S.listItem()
    .title('報名記錄')
    .id('registration-list')
    .child(
      S.list()
        .id('registration-actions')
        .title('報名記錄')
        .items([
          S.listItem()
            .id('all-registrations')
            .title('所有報名記錄')
            .child(
              S.component()
                .id('grouped-registrations')
                .title('按活動分組的報名記錄')
                .component(GroupedRegistrations)
            ),
          S.listItem()
            .id('bulk-delete-registrations')
            .title('批量刪除報名記錄')
            .icon(() => '🗑️')
            .child(
              S.component()
                .id('registration-bulk-delete')
                .title('批量刪除報名記錄')
                .component(RegistrationBulkDeleteTool)
            )
        ])
    );

  const eventListItem = S.listItem()
    .title('活動')
    .id('event-list')
    .child(
      S.documentTypeList('event')
        .id('event-type-list')
        .title('活動')
        .defaultOrdering([{ field: 'date', direction: 'desc' }])
    );

  const memberListItem = S.listItem()
    .title('成員')
    .id('member-list')
    .child(
      S.documentTypeList('member')
        .id('member-type-list')
        .title('所有成員')
        .defaultOrdering([{ field: 'name', direction: 'asc' }])
    );

  const groupListItem = S.listItem()
    .title('所有小組')
    .id('group-list')
    .child(
      S.documentTypeList('group')
        .id('group-type-list')
        .title('小組')
        .defaultOrdering([{ field: 'name', direction: 'asc' }])
        .child((groupId: string) =>
          S.list()
            .id(`group-overview-${groupId}`)
            .title(`小組：${groupId}`)
            .items([
              S.listItem()
                .id(`group-edit-${groupId}`)
                .title('編輯小組設定')
                .schemaType('group')
                .child(
                  S.document().schemaType('group').documentId(groupId)
                ),
              S.listItem()
                .id(`group-members-${groupId}`)
                .title('成員列表')
                .child(
                  S.documentList()
                    .id(`group-members-list-${groupId}`)
                    .title('成員列表')
                    .schemaType('member')
                    .filter('_type == "member" && $groupId in groups[]._ref')
                    .params({ groupId })
                    .defaultOrdering([{ field: 'name', direction: 'asc' }])
                ),
            ])
        )
    );

  const groupReportStatsListItem = S.listItem()
    .title('小組回報統計')
    .id('group-report-stats-menu')
    .icon(() => <span>📈</span>)
    .child(
      S.component()
        .id('group-report-stats')
        .title('小組回報統計')
        .component(GroupReportStatsTool)
    );

  // 原本的奉獻資訊
  const donationListItem = S.listItem()
    .title('奉獻資訊')
    .id('donation-list')
    .child(
      S.documentTypeList('donation')
        .id('donation-type-list')
        .title('奉獻資訊')
        .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
    );

  // 新增奉獻統計
  const donationStatsListItem = S.listItem()
    .title('奉獻統計')
    .id('donation-stats-menu')
    .icon(() => <span>💰</span>)
    .child(
      S.component()
        .id('donation-stats')
        .title('奉獻統計')
        .component(DonationStatsTool)
    );

  // 只新增網站流量統計
  const pageViewStatsListItem = S.listItem()
    .title('網站流量統計')
    .id('page-view-stats-menu')
    .icon(() => <span>📊</span>)
    .child(
      S.component()
        .id('page-view-stats')
        .title('網站流量統計')
        .component(PageViewStatsTool)
    );

  return S.list()
    .title('內容')
    .id('root-list')
    .items([
      userRegistrationListItem,
      S.divider(),
      registrationListItem,
      S.divider(),
      eventListItem,
      S.divider(),
      memberListItem,
      S.divider(),
      groupListItem,
      S.divider(),
      groupReportStatsListItem,
      pageViewStatsListItem, // << 新增
      S.divider(),
      donationListItem,
      donationStatsListItem,
      S.divider(),
    ]);
};
