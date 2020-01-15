

async function getClients() {
   const response = await fetch('http://localhost:3000/client/');
   const myJson = await response.json();
   console.log(myJson);
}

export default getClients;