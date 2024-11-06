import React from 'react';
import Leftbar from '../components/Leftbar';
import Rightbar from '../components/Rightbar'

function MainLayout({ children }) {
  return (
    <div className="flex">
      <div className="left-bar w-[20vw] fixed h-[100vh] top-0 bg-black p-4">
        <Leftbar />
      </div>
      <div className="content w-[60vw] mx-auto">
        {children}
      </div>
      <div className="right-bar w-[20vw] fixed h-[100vh] right-0 top-0 bg-black p-4">
        <Rightbar />
      </div>
    </div>
  );
}

export default MainLayout;
