import NavBar from '@/components/NavBar';
import Head from 'next/head';
import { motion } from 'framer-motion';
import CoreValueCard from '@/components/CoreValueCard';
import Footer from '@/components/Footer';

export default function CoreValuesPage() {
  const coreValues = [
    {
      id: 1,
      title: "教會是神愛的大家庭",
      content: [
        "你可以在這裡找到安全感、歸屬感、價值感",
        "你可以在這裡被接納、被愛、被珍惜",
        "全心愛神、彼此相愛、彼此相顧"
      ],
      verse: "\"你們要彼此相愛，像我愛你們一樣\"",
      verseRef: "約翰福音 15:12",
      gradient: "from-pink-500 to-orange-400",
      border: "border-pink-400"
    },
    {
      id: 2,
      title: "教會是醫治我們身心靈的醫院",
      content: [
        "一對一服事",
        "家人的愛、接納、肯定、扶持",
        "內在生活的操練帶來全人得醫治"
      ],
      verse: "\"醫治傷心的人，纏裹他們的傷處\"",
      verseRef: "詩篇 147:3",
      gradient: "from-blue-500 to-teal-400",
      border: "border-blue-400"
    },
    {
      id: 3,
      title: "教會是裝備我們的學校",
      content: [
        "1. 真理造就課程",
        "2. 內在生活課程",
        "3. 門徒訓練課程",
        "4. 領袖訓練課程"
      ],
      verse: "\"為要成全聖徒，各盡其職，建立基督的身體\"",
      verseRef: "以弗所書 4:12",
      gradient: "from-green-500 to-emerald-400",
      border: "border-green-400"
    },
    {
      id: 4,
      title: "教會成全我們成為上帝的同工",
      content: [
        "成為基督的精兵，作得勝者、一同建造基督的身體",
      ],
      verse: "\"為要成全聖徒，各盡其職，建立基督的身體\"",
      verseRef: "以弗所書 4:12",
      gradient: "from-purple-500 to-indigo-400",
      border: "border-purple-400"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Head>
        <title>教會核心價值 | 南科福氣教會</title>
        <meta name="description" content="了解南科福氣教會的核心價值" />
      </Head>
      <NavBar />
      
      <main className="flex-grow">
        {/* 主標題區塊 */}
        <section className="relative pt-32 pb-12 md:pt-48 md:py-28 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6">
                教會核心價值
              </h1>
              <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
              <p className="mt-4 text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
                我們的核心價值是我們對教會和信仰的基本信念，決定了我們的使命及行動方向
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-10 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto"
            >
              {coreValues.map((value) => (
                <CoreValueCard 
                  key={value.id}
                  id={value.id}
                  title={value.title}
                  content={value.content}
                  verse={value.verse}
                  verseRef={value.verseRef}
                  gradient={value.gradient}
                  border={value.border}
                />
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    <Footer />
    </div>
  );
}