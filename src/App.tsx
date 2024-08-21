import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from '@/pages/mainpage/Main';
import Form from '@/pages/form/Form';
import Header from '@/components/header/Header';

function App() {
  return (
    <div className='page'>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
