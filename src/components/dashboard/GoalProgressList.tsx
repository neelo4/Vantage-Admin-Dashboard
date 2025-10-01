import type { GoalProgress } from '../../data/mockData'

interface GoalProgressListProps {
  goals: GoalProgress[]
}

const GoalProgressList = ({ goals }: GoalProgressListProps) => {
  return (
    <div className="space-y-4">
      {goals.map((goal) => {
        const percent = Math.round((goal.progress / goal.target) * 100)
        return (
          <div key={goal.id} className="rounded-2xl bg-slate-100 p-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span className="font-medium text-slate-900">{goal.label}</span>
              <span>
                {goal.progress}/{goal.target}
              </span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white">
              <div
                className="h-full rounded-full bg-brand-500"
                style={{ width: `${Math.min(percent, 100)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-400">{Math.min(percent, 100)}% of target achieved</p>
          </div>
        )
      })}
    </div>
  )
}

export default GoalProgressList
