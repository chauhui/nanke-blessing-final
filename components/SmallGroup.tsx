'use client';
import { motion } from 'framer-motion';

export default function SmallGroup() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const groupInfo = [
    {
      id: 1,
      title: "小組聚會",
      content: [
        "每週聚會讀經、分享、禱告",
        "彼此關懷、互相代禱，一起服事、外展與福音工作"
      ],
      verse: '"並且照著主所分給各人的，和神所召各人的，都要如此行。我吩咐各教會都是這樣。"',
      verseRef: "哥林多前書 7:17",
      gradient: "from-blue-500 to-cyan-400",
      border: "border-blue-400"
    },
    {
      id: 2,
      title: "小組生活",
      content: [
        "小組是你屬靈的新家庭，",
        "在這裡有愛、接納、肯定、扶持"
      ],
      verse: '"我們這許多人，在基督裡成為一身，互相聯絡作肢體，也是如此。"',
      verseRef: "羅馬書 12:5",
      gradient: "from-teal-500 to-emerald-400",
      border: "border-teal-400"
    }
  ];

  const groupSchedules = [
    { id: 1, name: "尤君小組", day: "五", time: "19:30 ~ 21:30", location: "牧師家" },
    { id: 2, name: "朝暉小組", day: "五", time: "19:30 ~ 21:30", location: "朝暉家" },
    { id: 3, name: "榮杰小組", day: "五", time: "19:30 ~ 21:30", location: "榮杰家" },
    { id: 4, name: "秀蘭小組", day: "六", time: "8:00 ~ 9:45", location: "美善農場" },
    { id: 5, name: "俊男小組", day: "六", time: "14:30 ~ 16:30", location: "美善農場" },
    { id: 6, name: "青少年團契", day: "日", time: "16:00 ~ 18:30", location: "牧師家" },
    { id: 7, name: "黃晨小組", day: "一", time: "19:30 ~ 21:00", location: "牧師家(1、2樓)" },
    { id: 8, name: "勝騰小組", day: "一", time: "20:00 ~ 22:00", location: "牧師家(1、2樓)" },
    { id: 9, name: "玉真小組", day: "一", time: "10:00 ~ 12:00", location: "玉真家" }
  ];

  return (
    <section id="我們的小組" className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* 小組介紹卡片 */}
        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto mb-16"
        >
          {groupInfo.map((item) => (
            <motion.div 
              key={item.id}
              variants={fadeInUp}
              className={`relative group rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl md:hover:-translate-y-2 bg-gradient-to-br ${item.gradient} bg-opacity-10`}
            >
              <div className={`absolute inset-0 bg-white opacity-90 group-hover:opacity-80 transition-opacity`}></div>
              <div className="relative p-8">
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <span className="text-3xl font-bold text-white">{item.id === 1 ? '01' : '02'}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">
                  <span className={`bg-clip-text text-transparent bg-gradient-to-r ${item.gradient}`}>
                    {item.title}
                  </span>
                </h2>
                
                <div className="p-4 md:p-6">
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center">
                    {Array.isArray(item.content) ? (
                      <>
                        {item.content[0]}
                        <br className="hidden md:block" />
                        {item.content[1]}
                      </>
                    ) : (
                      item.content
                    )}
                  </p>
                </div>
                
                {item.verse && (
                  <div className="mt-6 pt-4 md:pt-6 border-t border-gray-100">
                    <p className="text-sm md:text-base text-center text-gray-600 italic">
                      {item.verse}
                      <span className="block text-sm mt-2 text-gray-500">{item.verseRef}</span>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 小組時間表 - 手機版視圖 */}
        <div className="space-y-4 md:hidden">
          {groupSchedules.map((schedule, index) => (
            <motion.div
              key={schedule.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-teal-400 text-white font-bold">
                    {schedule.id}
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-base font-medium text-gray-900">{schedule.name}</h3>
                    <div className="mt-1 flex items-center text-sm text-blue-600">
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      每週{schedule.day} {schedule.time}
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-600">
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {schedule.location}
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-blue-200 to-teal-200"></div>
            </motion.div>
          ))}
        </div>

        {/* 小組時間表 - 桌面版視圖 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="hidden md:block max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-teal-500 py-4 px-6">
              小組聚會時間表
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-100 via-teal-100 to-cyan-100">
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-800 uppercase tracking-wider">
                      聚會名稱
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-800 uppercase tracking-wider">
                      星期
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-800 uppercase tracking-wider">
                      時間
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-blue-800 uppercase tracking-wider">
                      地點
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {groupSchedules.map((schedule, index) => (
                    <motion.tr 
                      key={schedule.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-blue-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-teal-400 text-white font-bold">
                            {schedule.id}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {schedule.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700 font-medium">
                          每週{schedule.day}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-700">
                          <svg className="h-4 w-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {schedule.time}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="h-4 w-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {schedule.location}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 text-center text-gray-700">
              <p className="text-sm md:text-base">歡迎聯繫教會辦公室了解更多小組資訊或加入小組</p>
            </div>
            
            <div className="h-1.5 bg-gradient-to-r from-blue-200 via-teal-200 to-cyan-200"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}