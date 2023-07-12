import Link from 'next/link';
import BarraDeNav from './menu';
import { useEffect } from 'react';
import { useRouter } from 'next/router';


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Home() {
  const router = useRouter();

//  useEffect(() => {
//   router.push('/auth/login')
//  }, [])

  
  return (
    <div>
      <h1><Link className="login" href="/auth/login"> Inicio de sesion</Link></h1>
      <BarraDeNav />
    </div>
  );
}
