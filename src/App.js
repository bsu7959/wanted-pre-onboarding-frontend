import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Todo from './pages/Todo';

function App() {

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={window.localStorage.getItem('JWT') ? <Todo /> :<Signin />} />
        <Route path='/signin' element={window.localStorage.getItem('JWT') ? <Todo /> :<Signin />} />
        <Route path='/signup' element={ window.localStorage.getItem('JWT') ? <Todo /> : <Signup />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
