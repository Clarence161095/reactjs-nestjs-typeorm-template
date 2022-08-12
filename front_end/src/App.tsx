import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import databaseHook from './hooks/database.hook';
import RootRouter from './routers/Root.router';

function App() {
  databaseHook();
  return (
    <div className="relative flex flex-col min-h-screen text-white z-50 bg-[#192a56]">
      <RootRouter />
      <ToastContainer className={'responsive-small-phone'} />
    </div>
  );
}

export default App;
