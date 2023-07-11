import Link from 'next/link';
import BarraDeNav from './menu';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Home() {
  return (
    <div>
      <h1><Link className="login" href="/auth/login"> Inicio de sesion</Link></h1>
      <BarraDeNav />
    </div>
  );
}
