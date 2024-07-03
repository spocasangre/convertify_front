import { useState } from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ConvertForm from './Pages/ConvertForm';
import FileChooserPage from './Pages/FileChooserPage';
import FileSavePage from './Pages/FileSavePage';

function App() {

  return (
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <Routes>
          <Route path="/" element={<FileChooserPage/>}/>
          <Route path="/convert" element={<ConvertForm/>}/>
          <Route path="/save" element={<FileSavePage/>}/>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false}/>
      </Router>
    </QueryClientProvider>
  )
}

export default App
