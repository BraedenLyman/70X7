import { useEffect, useRef } from 'react'

export default function PageTransition({ children }) {
  const ref = useRef(null)

  useEffect(() => {
    ref.current?.classList.add('page-enter')
    const t = setTimeout(() => ref.current?.classList.remove('page-enter'), 350)
    return () => clearTimeout(t)
  }, [])

  return (
    <div ref={ref} className="page-transition-wrapper">
      {children}
    </div>
  )
}
