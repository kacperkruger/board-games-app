import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './ui/components/Home'
import GameList from './ui/games/GameList';
import GameDetailsProps from './ui/games/GameDetailsProps';
import GameForm from './ui/games/GameForm';
import GameFormProps from './ui/games/GameFormProps';
import Navbar from './ui/components/Navbar';
import PublisherList from './ui/publishers/PublisherList';
import PublisherDetailsProps from './ui/publishers/PublisherDetailsProps';
import PublisherFormProps from './ui/publishers/PublisherFormProps';
import PublisherForm from './ui/publishers/PublisherForm';
import { ConfirmProvider } from 'material-ui-confirm';
import { useKeycloak } from "@react-keycloak/web";
import PrivateRoute from "./ui/components/PrivateRoute";

function App() {
  const {initialized} = useKeycloak();
  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
      <ConfirmProvider>
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/games" element={<GameList />} />
              <Route path="/games/:id" element={<GameDetailsProps />} />
              <Route path="/games/:id/edit" element={<PrivateRoute validPage={<GameFormProps />}/>} />
              <Route path="/games/add" element={<PrivateRoute validPage={<GameForm />}/>} />
              <Route path='/publishers' element={<PublisherList />}/>
              <Route path='/publishers/:id' element={<PublisherDetailsProps/>} />
              <Route path='/publishers/:id/edit' element={<PrivateRoute validPage={<PublisherFormProps />}/>} />
              <Route path='/publishers/add' element={<PublisherForm />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ConfirmProvider>
  );
}

export default App;
