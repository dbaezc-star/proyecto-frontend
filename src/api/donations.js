import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const createDonation = async (donorId, token) => {
    const response = await axios.post(
        API_URL + '/donations?donorId=' + donorId,
        {},
        { headers: { Authorization: 'Bearer ' + token } }
    );
    return response.data;
};

export const getDonationsByDonor = async (donorId, token) => {
    const response = await axios.get(
        API_URL + '/donations/donor/' + donorId,
        { headers: { Authorization: 'Bearer ' + token } }
    );
    return response.data;
};

export const getDonorByEmail = async (email, token) => {
    const response = await axios.get(
        API_URL + '/donors/by-email/' + email,
        { headers: { Authorization: 'Bearer ' + token } }
    );
    return response.data;
};