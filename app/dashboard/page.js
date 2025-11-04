import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  // Fetch all data
  const [emailListResult, vendorRequestsResult] = await Promise.all([
    supabase
      .from('email_list')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('vendor_requests')
      .select('*')
      .order('created_at', { ascending: false })
  ])

  const emailList = emailListResult.data || []
  const vendorRequests = vendorRequestsResult.data || []

  // Calculate stats
  const stats = {
    totalEmailSubscribers: emailList.length,
    totalVendorRequests: vendorRequests.length,
    recentEmailSubscribers: emailList.filter(item => {
      const daysSinceCreation = (new Date() - new Date(item.created_at)) / (1000 * 60 * 60 * 24)
      return daysSinceCreation <= 30
    }).length,
    recentVendorRequests: vendorRequests.filter(item => {
      const daysSinceCreation = (new Date() - new Date(item.created_at)) / (1000 * 60 * 60 * 24)
      return daysSinceCreation <= 30
    }).length,
  }

  return (
    <DashboardClient
      user={user}
      emailList={emailList}
      vendorRequests={vendorRequests}
      stats={stats}
    />
  )
}
