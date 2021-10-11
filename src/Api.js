const BASE_API = '';

export default {
  signIn: async (email, password) => {
    const req = await fetch(`${BASE_API}/auth/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });

    const json = await req.json();
    return json;
  },
  signUp: async (name, email, password, state, city, address, telephone, genre, image) => {
    const req = await fetch(`${BASE_API}/auth/user`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password, state, city, address, telephone, genre, image})
    });

    const json = await req.json();
    return json;
  },
  getWorkers: async () => {
    const req = await fetch(`${BASE_API}/auth/workers`);
    const json = await req.json();
    return json;
  },
  getWorker: async (id) => {
    const req = await fetch(`${BASE_API}/auth/worker/${id}`);
    const json = await req.json();
    return json;
  }
};