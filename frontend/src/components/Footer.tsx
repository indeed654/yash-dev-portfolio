import { owner } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="px-6 sm:px-12 md:px-20 lg:px-28 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-gray-200 pt-6 text-[12px] font-medium text-gray-400 sm:flex-row sm:items-center sm:justify-between">
        <p>{owner.name}</p>
        <p>{owner.roles.join(' • ')}</p>
      </div>
    </footer>
  )
}
