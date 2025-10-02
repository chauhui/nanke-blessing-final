// studio/structure/index.ts
import GroupReportStatsTool from './components/GroupReportStatsTool'
import RegistrationBulkDeleteTool from './components/RegistrationBulkDeleteTool'
import GroupedRegistrations from './components/GroupedRegistrations'
import DonationStatsTool from './components/DonationStatsTool'
import PageViewStatsTool from './components/PageViewStatsTool'

export const structure = (S: any) => {
  // Hero Slide 固定出現在側欄，依 order 遞增
  const heroSlideListItem = S.listItem()
    .title('Hero Slide')
    .id('hero-slide-list')
    .child(
      S.documentTypeList('heroSlide')
        .id('hero-slide-type-list')
        .title('Hero Slide')
        .defaultOrdering([{ field: 'order', direction: 'asc' }])
    )

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
          S.document().schemaType('userRegistration').documentId(docId)
        )
    )

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
            ),
        ])
    )

  const eventListItem = S.listItem()
    .title('活動')
    .id('event-list')
    .child(
      S.documentTypeList('event')
        .id('event-type-list')
        .title('活動')
        .defaultOrdering([{ field: 'date', direction: 'desc' }])
    )

  // 👉 新增：本月主題（月別）為獨立頂層項，不隸屬「教會行事曆」
  const monthlyPlanListItem = S.listItem()
    .title('本月主題')
    .id('monthly-plan')
    .child(
      S.documentTypeList('monthlyPlan')
        .id('monthly-plan-type-list')
        .title('本月主題（月別）')
        .defaultOrdering([{ field: 'month', direction: 'desc' }])
    )

  // ★ 新增：生命見證
  const testimonyListItem = S.listItem()
    .title('生命見證')
    .id('testimony-list')
    .child(
      S.documentTypeList('testimony')
        .id('testimony-type-list')
        .title('生命見證')
        .defaultOrdering([{ field: 'order', direction: 'asc' }, { field: '_createdAt', direction: 'desc' }])
    )

  const memberListItem = S.listItem()
    .title('成員')
    .id('member-list')
    .child(
      S.documentTypeList('member')
        .id('member-type-list')
        .title('所有成員')
        .defaultOrdering([{ field: 'name', direction: 'asc' }])
    )

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
                .child(S.document().schemaType('group').documentId(groupId)),
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
    )

  const groupReportStatsListItem = S.listItem()
    .title('小組回報統計')
    .id('group-report-stats-menu')
    .icon(() => '📈')
    .child(
      S.component()
        .id('group-report-stats')
        .title('小組回報統計')
        .component(GroupReportStatsTool)
    )

  const donationListItem = S.listItem()
    .title('奉獻資訊')
    .id('donation-list')
    .child(
      S.documentTypeList('donation')
        .id('donation-type-list')
        .title('奉獻資訊')
        .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
    )

  const donationStatsListItem = S.listItem()
    .title('奉獻統計')
    .id('donation-stats-menu')
    .icon(() => '💰')
    .child(
      S.component()
        .id('donation-stats')
        .title('奉獻統計')
        .component(DonationStatsTool)
    )

  const pageViewStatsListItem = S.listItem()
    .title('網站流量統計')
    .id('page-view-stats-menu')
    .icon(() => '📊')
    .child(
      S.component()
        .id('page-view-stats')
        .title('網站流量統計')
        .component(PageViewStatsTool)
    )

  return S.list()
    .title('內容')
    .id('root-list')
    .items([
      heroSlideListItem,
      S.divider(),
      userRegistrationListItem,
      S.divider(),
      registrationListItem,
      S.divider(),
      eventListItem,
      // 👉 把「本月主題」放在活動後面，與行事曆平級
      monthlyPlanListItem,
      // ★ 生命見證放在本月主題之後
      testimonyListItem,
      S.divider(),
      memberListItem,
      S.divider(),
      groupListItem,
      S.divider(),
      groupReportStatsListItem,
      pageViewStatsListItem,
      S.divider(),
      donationListItem,
      donationStatsListItem,
      S.divider(),
    ])
}
