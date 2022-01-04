import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ToWatchList, Page404, AboutFilm } from "../pages"


const App = () => {
 
  
  return (

    <BrowserRouter>
        <Routes>
          <Route path="/" element={<ToWatchList/>}/>
          <Route path="/film/:id" element={<AboutFilm/>}/>
          <Route path="*" element={<Page404/>}/>
        </Routes>
    </BrowserRouter>
  )

}


export default App