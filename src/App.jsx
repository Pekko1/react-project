
import Home from "./components/Home"
import RecipeDetails from "./components/RecipeDetails"
import "./app.css"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"


function App(){

    return(
        <Router>
            <div className="container">
                <Routes>
                    <Route exact path="/" Component={Home}/>
                    <Route path="/recipe/:id" Component={RecipeDetails}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App