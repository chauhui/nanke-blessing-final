// scripts/queryGroupReports.js
const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_API_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
})

async function queryReports() {
  try {
    const query = `
      *[_type == "groupReport"] {
        _id,
        title,
        date,
        "groupName": group->name,
        "reports": reports[] {
          "memberName": member->name,
          oikos,
          _key
        },
        _createdAt,
        _updatedAt
      } | order(date desc)
    `
    
    const reports = await client.fetch(query)
    console.log('Fetched reports:', JSON.stringify(reports, null, 2))
    
    // 統計 OIKOS 數據
    const oikosStats = {
      total: 0,
      byType: { p: 0, l: 0 },
      details: []
    }
    
    reports.forEach(report => {
      if (report.reports && report.reports.length > 0) {
        report.reports.forEach(r => {
          if (r.oikos) {
            oikosStats.total++
            if (r.oikos === 'p') oikosStats.byType.p++
            if (r.oikos === 'l') oikosStats.byType.l++
            oikosStats.details.push({
              reportId: report._id,
              reportTitle: report.title,
              date: report.date,
              group: report.groupName,
              member: r.memberName,
              oikos: r.oikos,
              _key: r._key
            })
          }
        })
      }
    })
    
    console.log('\nOIKOS Statistics:')
    console.log('Total OIKOS reports:', oikosStats.total)
    console.log('By type:', oikosStats.byType)
    console.log('\nDetailed OIKOS reports:')
    console.table(oikosStats.details)
    
  } catch (error) {
    console.error('Error fetching reports:', error)
  }
}

queryReports()
