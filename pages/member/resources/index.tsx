import { useState } from 'react'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { client as sanityClient } from '@/lib/sanity.client'
import { memberResourcesQuery, type MemberResource } from '@/lib/queries'

interface ResourcesPageProps {
  resources: MemberResource[]
}

function FileIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8m-6-6l6 6m-6-6v6h6M8 13h8m-8 4h6" />
    </svg>
  )
}

function LinkIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10 13a5 5 0 007.07.07l2-2a5 5 0 00-7.07-7.07l-1.15 1.15m3.15 5.85a5 5 0 00-7.07-.07l-2 2A5 5 0 0012 20l1.15-1.15" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0z" />
    </svg>
  )
}

function formatFileSize(bytes?: number) {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${Math.ceil(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function getDestination(resource: MemberResource) {
  if (resource.resourceType === 'link') return resource.url || '#'
  if (!resource.fileUrl) return '#'
  return `${resource.fileUrl}?dl=${encodeURIComponent(resource.fileName || resource.title)}`
}

function ResourceCard({ resource }: { resource: MemberResource }) {
  const isFile = resource.resourceType === 'file'
  const fileMeta = [resource.fileName, formatFileSize(resource.fileSize)].filter(Boolean).join(' · ')

  return (
    <article className="group bg-white border border-[#DED5CA] rounded-sm p-6 md:p-7 flex flex-col min-h-[280px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_-24px_rgba(30,27,75,0.35)] hover:border-[#B45309]/50">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="w-12 h-12 flex items-center justify-center bg-[#F7F5F2] text-[#1E1B4B] border border-[#E8E0D7] rounded-sm group-hover:bg-[#1E1B4B] group-hover:text-white transition-colors duration-300">
          {isFile ? <FileIcon /> : <LinkIcon />}
        </div>
        <span className="text-[11px] font-bold tracking-[0.16em] text-[#B45309] uppercase pt-1">
          {resource.category}
        </span>
      </div>

      <h2 className="text-xl font-bold text-[#1E1B4B] leading-snug mb-3 group-hover:text-[#B45309] transition-colors">
        {resource.title}
      </h2>
      {resource.description && (
        <p className="text-sm leading-7 text-[#64748B] mb-5 line-clamp-3">{resource.description}</p>
      )}

      <div className="mt-auto pt-5 border-t border-[#EEE9E3] flex items-end justify-between gap-4">
        <div className="min-w-0 text-xs text-[#94A3B8]">
          <div>{resource.publishedAt.replaceAll('-', '.')}</div>
          {isFile && fileMeta && <div className="mt-1 truncate max-w-[180px]">{fileMeta}</div>}
        </div>
        <a
          href={getDestination(resource)}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 text-sm font-bold text-[#1E1B4B] hover:text-[#B45309] no-underline"
        >
          {isFile ? '下載檔案' : '前往連結'}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  )
}

export default function ResourcesPage({ resources }: ResourcesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [searchTerm, setSearchTerm] = useState('')
  const categories = ['全部', ...Array.from(new Set(resources.map((resource) => resource.category)))]
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase('zh-TW')
  const filteredResources = resources.filter((resource) => {
    const matchesCategory = selectedCategory === '全部' || resource.category === selectedCategory
    const searchableText = `${resource.title} ${resource.description || ''} ${resource.category}`.toLocaleLowerCase('zh-TW')
    return matchesCategory && (!normalizedSearch || searchableText.includes(normalizedSearch))
  })
  const resourcesByCategory = filteredResources.reduce<Record<string, MemberResource[]>>((groups, resource) => {
    groups[resource.category] ??= []
    groups[resource.category].push(resource)
    return groups
  }, {})

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F2] text-[#1E1B4B] font-sans selection:bg-[#C7D2FE] selection:text-[#1E1B4B]">
      <NavBar />

      <main className="flex-grow pt-28 md:pt-40 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10 md:mb-14 border-b border-[#D4C5B5] pb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="text-[#B45309] font-bold tracking-[0.2em] text-xs uppercase block mb-2">
                Member Resources
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1E1B4B] mb-3">資源中心</h1>
              <p className="text-[#64748B] leading-7 max-w-2xl">
                集中查找教會文件、小組教材、常用表單與相關資源連結。
              </p>
            </div>
            <div className="text-left lg:text-right">
              <div className="text-3xl font-serif font-bold text-[#1E1B4B]">{resources.length}</div>
              <div className="text-xs tracking-[0.15em] text-[#94A3B8] mt-1">AVAILABLE RESOURCES</div>
            </div>
          </header>

          {resources.length > 0 && (
            <section className="mb-10" aria-label="資源篩選">
              <div className="bg-white border border-[#DED5CA] rounded-sm p-4 md:p-5 flex flex-col lg:flex-row lg:items-center gap-4 lg:justify-between">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 text-sm font-bold border rounded-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-[#1E1B4B] border-[#1E1B4B] text-white'
                          : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-[#B45309] hover:text-[#B45309]'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <label className="relative block w-full lg:w-72">
                  <span className="sr-only">搜尋資源</span>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"><SearchIcon /></span>
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="搜尋資源"
                    className="w-full border border-[#E2E8F0] bg-[#FAFAF9] py-2.5 pl-11 pr-4 text-sm text-[#1E1B4B] outline-none rounded-sm focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309]"
                  />
                </label>
              </div>
            </section>
          )}

          {resources.length === 0 ? (
            <div className="text-center py-20 bg-white border border-[#D4C5B5] rounded-sm">
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center bg-[#F7F5F2] text-[#94A3B8] rounded-full">
                <FileIcon className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold mb-2">資源準備中</h2>
              <p className="text-[#64748B]">目前尚無可瀏覽的資源，請稍後再回來查看。</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-16 border-y border-[#D4C5B5]">
              <h2 className="text-xl font-bold mb-2">找不到符合的資源</h2>
              <p className="text-[#64748B]">請嘗試其他關鍵字或資源分類。</p>
            </div>
          ) : (
            <section aria-label="資源列表">
              {Object.entries(resourcesByCategory).map(([category, categoryResources]) => (
                <div key={category} className="mb-14 last:mb-0">
                  <div className="flex items-center gap-3 mb-7 border-b border-[#DED5CA] pb-4">
                    <div className="w-2 h-7 bg-[#B45309]" />
                    <h2 className="text-2xl font-bold tracking-wide">{category}</h2>
                    <span className="text-sm text-[#94A3B8]">{categoryResources.length} 項</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {categoryResources.map((resource) => (
                      <ResourceCard key={resource._id} resource={resource} />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<ResourcesPageProps> = async (ctx) => {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?callbackUrl=${encodeURIComponent(ctx.resolvedUrl)}`,
        permanent: false,
      },
    }
  }

  const resources = await sanityClient.fetch<MemberResource[]>(memberResourcesQuery)

  return {
    props: {
      resources,
    },
  }
}
