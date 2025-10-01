import clsx from 'clsx'
import type { PropsWithChildren, ReactNode } from 'react'

interface CardProps extends PropsWithChildren {
  title?: string
  description?: string
  action?: ReactNode
  className?: string
  headerClassName?: string
  bodyClassName?: string
}

const Card = ({
  title,
  description,
  action,
  className,
  headerClassName,
  bodyClassName,
  children,
}: CardProps) => {
  return (
    <section
      className={clsx(
        'rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
    >
      {(title || description || action) && (
        <header
          className={clsx(
            'flex flex-col gap-2 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between',
            headerClassName,
          )}
        >
          <div>
            {title && <h2 className="text-base font-semibold text-slate-900">{title}</h2>}
            {description && <p className="text-sm text-slate-500">{description}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}

      <div className={clsx('px-6 py-5', bodyClassName)}>{children}</div>
    </section>
  )
}

export default Card
