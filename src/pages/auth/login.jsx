import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            loginUser({ email: data.email, role: data.role }, data.token);
            if (data.role === 'DONOR') {
                navigate('/donor/dashboard');
            } else if (data.role === 'AESTHETIC_CENTER') {
                navigate('/aesthetic/dashboard');
            } else {
                navigate('/dashboard');
                }
        } catch (err) {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>DonaVida 💇‍♀️</h2>
                <h3 style={styles.subtitle}>Iniciar Sesión</h3>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        style={styles.input}
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        style={styles.input}
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button style={styles.button} type="submit">Ingresar</button>
                </form>
                <p style={styles.link}>
                    ¿No tienes cuenta? <a href="/register">Regístrate</a>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' },
    card: { backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '350px' },
    title: { textAlign: 'center', color: '#e91e8c', marginBottom: '0.5rem' },
    subtitle: { textAlign: 'center', color: '#333', marginBottom: '1.5rem' },
    input: { width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' },
    button: { width: '100%', padding: '0.75rem', backgroundColor: '#e91e8c', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' },
    error: { color: 'red', textAlign: 'center', marginBottom: '1rem' },
    link: { textAlign: 'center', marginTop: '1rem' }
};

export default Login;