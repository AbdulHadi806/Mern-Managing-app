import './App.css';
import Form from './components/form';
import Todos from './components/todos';

function App() {
  return (
    <div className='bg-[#2061cb] h-[100vh] max-w-[100vw]  pt-[40px]'>
      <div className="App">
      <h1 className='text-[#2061cb] bg-white text-center text-[38px] font-semibold'> App </h1>
      <div className="px-[450px] mt-5 text-center mx-auto">
        <div className='bg-white text-center rounded  pt-[26px] pb-5'>
          <Form />
          <Todos />
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
