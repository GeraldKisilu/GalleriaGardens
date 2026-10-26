type IconName =
  | 'arrow'
  | 'calendar'
  | 'chat'
  | 'check'
  | 'dumbbell'
  | 'home'
  | 'map'
  | 'menu'
  | 'phone'
  | 'pool'
  | 'shield'
  | 'tools'
  | 'users'

const paths: Record<IconName, React.ReactNode> = {
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  chat: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /><path d="M8 10h8M8 14h5" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  dumbbell: <><path d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11" /></>,
  home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10M9 21v-7h6v7" /></>,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" /><path d="M9 3v15M15 6v15" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c1 .4 2 .6 2.9.7A2 2 0 0 1 22 16.9Z" />,
  pool: <><path d="M2 18c2 0 2-1.5 4-1.5S8 18 10 18s2-1.5 4-1.5S16 18 18 18s2-1.5 4-1.5" /><path d="M2 22c2 0 2-1.5 4-1.5S8 22 10 22s2-1.5 4-1.5S16 22 18 22s2-1.5 4-1.5M7 16V5a3 3 0 0 1 6 0M7 10h6" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  tools: <><path d="m14.7 6.3 3-3a4 4 0 0 1-5 5l-7.5 7.5a2.1 2.1 0 1 0 3 3l7.5-7.5a4 4 0 0 1 5-5l-3 3Z" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
}

export function Icon({ name, className = 'size-5' }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  )
}
