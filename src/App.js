import React from 'react';
import LoginButton from './components/LoginButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* 다른 컴포넌트들이 있다면 여기에 추가 */}
        <LoginButton />
      </header>
    </div>
  );
}

export default App;
