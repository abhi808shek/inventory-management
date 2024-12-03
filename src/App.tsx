
import { useEffect, useState } from 'react';
import './App.module.css';
import handleAsync from './utils/handleAsync';

const App = () => {
  const [loading, setLoading] = useState(false);

  const onLoad = handleAsync(async() => {
    setLoading(true);
  }, () => setLoading(false));

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <h1>Hello World</h1>
  )
}

export default App;
