// O único arquivo que sabe onde a API mora.
// No deploy (S5), o endereço muda aqui e em mais nenhum lugar.
const LOCAL = ['localhost', '127.0.0.1'].includes(location.hostname);

export const API_URL = LOCAL
  ? 'http://localhost:3000'
  : 'https://progweb-p1-renan-martins.onrender.com';   // sem barra no final
