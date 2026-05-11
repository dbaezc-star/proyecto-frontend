import { useState } from 'react';
import { register } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({ email: '', password: '', fullName: '', phone: '', city: '', role: 'DONOR', name: '', address: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            navigate('/login');
        } catch (err) {
            setError('Error al registrarse');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>DonaVida 💇‍♀️</h2>
                <h3 style={styles.subtitle}>Registro</h3>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <select style={styles.input} name="role" onChange={handleChange}>
                        <option value="DONOR">Donante</option>
                        <option value="AESTHETIC_CENTER">Centro Estético</option>
                    </select>
                    {form.role === 'DONOR' && (
                        <input style={styles.input} type="text" name="fullName" placeholder="Nombre completo" onChange={handleChange} required />
                    )}
                    {form.role === 'AESTHETIC_CENTER' && (
                        <>
                            <input style={styles.input} type="text" name="name" placeholder="Nombre del centro" onChange={handleChange} required />
                            <input style={styles.input} type="text" name="address" placeholder="Dirección" onChange={handleChange} required />
                        </>
                    )}
                    <input style={styles.input} type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
                    <input style={styles.input} type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
                    <input style={styles.input} type="text" name="phone" placeholder="Teléfono" onChange={handleChange} required />
                    <input style={styles.input} type="text" name="city" placeholder="Ciudad" onChange={handleChange} required />
                    <button style={styles.button} type="submit">Registrarse</button>
                </form>
                <p style={styles.link}>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' },
    card: { backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '350px' },
    title: { textAlign: 'center', color: '#e91e8c', marginBottom: '0.5rem' },
    subtitle: { textAlign: 'center', color: '#333', marginBottom: '1.5rem' },
    input: { width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' },
    button: { width: '100%', padding: '0.75rem', backgroundColor: '#e91e8c', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' },
    error: { color: 'red', textAlign: 'center', marginBottom: '1rem' },
    link: { textAlign: 'center', marginTop: '1rem' }
};

export default Register;