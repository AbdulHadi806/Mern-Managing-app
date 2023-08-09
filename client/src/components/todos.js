import React from 'react';
import Todo from './todo';
import { useFetchTodoQuery} from '../redux/apiCalls/todoApi';

function Todos() {
  const { data, isLoading } = useFetchTodoQuery();
  if (isLoading) {
    return <h1 className="text-white">Data is Loading</h1>;
  }

  return (
    <div className=" max-h-[500px] overflow-y-auto">
      <ul>
        {data.length == 0? <h1 className='text-center'>Please Upload Todos</h1>:
          data.map((item) => {
            return (
              <Todo
                key={item._id}
                item={item}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default Todos;