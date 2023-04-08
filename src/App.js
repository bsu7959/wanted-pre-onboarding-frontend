import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Todo from './pages/Todo';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
