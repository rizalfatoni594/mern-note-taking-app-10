import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import NoteDetailPage from './pages/NoteDetailPage.jsx';

export default function App() {
  return (
    <div data-theme='light' className='relative h-full w-full'>
      <div className='absolute inset-0 -z-10 size-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#FFF_60%,#00FF9D40_100%)]'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path='/' element={<NoteDetailPage />} />
        </Routes>
      </div>
    </div>
  );
}
