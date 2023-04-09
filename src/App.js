import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Todo from './pages/Todo';

function App() {
  // 로그인시 못받아온 userid 대신 email을 setState했습니다.
  const [ userId, setUserId ] = useState('');
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Signin userId={userId} setUserId={setUserId}/>} />
        <Route path='/signin' element={<Signin userId={userId} setUserId={setUserId}/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/todo' element={<Todo userId={userId} setUserId={setUserId}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
