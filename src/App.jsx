import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Dashboard from './pages/dashboard';
import DonorDashboard from './pages/donor/DonorDashboard';
import AestheticDashboard from './pages/aesthetic/AestheticDashboard';

function App() {
    console.log('App cargado');
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/donor/dashboard" element={<DonorDashboard />} />
                    <Route path="/aesthetic/dashboard" element={<AestheticDashboard />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

