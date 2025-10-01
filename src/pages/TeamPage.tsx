import { useMemo } from 'react'
import Card from '../components/ui/Card'

const team = [
  {
    name: 'Amelia Chen',
    role: 'Director of Operations',
    focus: 'Revenue & Forecasting',
    timezone: 'PT',
    status: 'Online',
  },
  {
    name: 'Kevin',
    role: 'Business Analyst',
    focus: 'Growth Experiments',
    timezone: 'ET',
    status: 'In collaboration',
  },
  {
    name: 'Sofia Martinez',
    role: 'Finance Associate',
    focus: 'Planning & Insights',
    timezone: 'CT',
    status: 'Reviewing pipeline',
  },
  {
    name: 'Priya Natarajan',
    role: 'Customer Success Lead',
    focus: 'Enterprise Renewals',
    timezone: 'GMT',
    status: 'In customer call',
  },
]

const TeamPage = () => {
  const initials = useMemo(
    () =>
      Object.fromEntries(
        team.map((member) => [
          member.name,
          member.name
            .split(' ')
            .map((part) => part[0])
            .join(''),
        ]),
      ),
    [],
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900">Team workspace</h1>
        <p className="text-sm text-slate-500">
          Align revenue, operations, and customer teams on shared goals. Assign owners and track current focus areas.
        </p>
      </div>

      <Card title="People overview" description="Active collaborators and their current context.">
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Team member</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Current focus</th>
                <th className="px-4 py-3 font-medium">Timezone</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              {team.map((member) => (
                <tr key={member.name} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                        {initials[member.name]}
                      </span>
                      <span className="font-medium text-slate-900">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{member.role}</td>
                  <td className="px-4 py-3">{member.focus}</td>
                  <td className="px-4 py-3">{member.timezone}</td>
                  <td className="px-4 py-3 text-emerald-600">{member.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default TeamPage
