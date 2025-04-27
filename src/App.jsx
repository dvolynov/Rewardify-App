import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

function PrivateRoute({ children }) {
    const token = Cookies.get('auth_token');
    return token ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/app/*" element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;