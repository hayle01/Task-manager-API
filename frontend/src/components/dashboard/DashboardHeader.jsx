import { ClipboardCheck, LogOut } from 'lucide-react';
import useAuthStore from '../../lib/Store/authStore';
import { Button } from '../ui/button'
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
export const DashboardHeader = () => {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleLogout = () => {
    if(confirm('Are you sure you want to logout!')){
      clearAuth();
      queryClient.clear();
      navigate('/', {replace: true});
    }
  }
  return (
    <header className='bg-card border-b border-border shadow-sm'>
        <div className='w-full px-4 py-4 flex items-center justify-between'>
          {/* Right: LOGO */}
          <div className='flex items-center gap-3'>
              <div className='flex h-8 w-8 items-center justify-center rounded-md bg-primary'>
                <ClipboardCheck className='h-4 w-4 text-primary-foreground' />
              </div>
              <h1 className='text-xl font-semibold text-foreground'>Task Dashboard.</h1>
          </div>

        <div className='flex items-center gap-4'>
          <span className='text-sm text-muted-foreground'>
            Welcome, <span className='font-medium text-foreground'>
              {user?.name || 'User'} 
            </span>
          </span>
          <Button variant={'outline'} onClick={handleLogout}> Logout </Button>
          
        </div>


        </div>

    </header>
  )
}
