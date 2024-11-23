import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const withAuth = (WrappedComponent: React.ComponentType) => {
    //eslint-disable-next-line
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/login')
        } else {
          setIsAuthenticated(true)
        }
      }
    }, [router])

    if (!isAuthenticated) {
      return null
    }

    return <WrappedComponent {...props} />
  }

  return AuthenticatedComponent
}

export default withAuth
