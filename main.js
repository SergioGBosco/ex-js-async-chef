// In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:
// Recuperare la ricetta da https://dummyjson.com/recipes/{id}
// Estrarre la proprietà userId dalla ricetta
// Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
// Restituire la data di nascita dello chef
// Note del docente
// Scrivi la funzione getChefBirthday(id), che deve:
// Essere asincrona (async).
// Utilizzare await per chiamare le API.
// Restituire una Promise con la data di nascita dello chef.
// Gestire gli errori con try/catch


// 🎯 Bonus 1
// Attualmente, se la prima richiesta non trova una ricetta, la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.

// Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta.

async function getChefBirthday(id) {
  let ricetta;
  try {
    const ricettaResponse = await fetch(`https://dummyjson.com/recipes/${id}`)
    ricetta = await ricettaResponse.json();
  } catch (err) {
    throw new Error("la ricetta non è stata trovata");
  }
  if (ricetta.message) {
    throw new Error(`la ricetta con questo ID ${id} non è stata trovata`);
  }
  let infoChef;
  try {
    const infoChefResponse = await fetch(`https://dummyjson.com/users/${ricetta.userId}`)
    infoChef = await infoChefResponse.json();
  } catch (err) {
    throw new Error("le informazioni dello chef non sono state trovate");
  }
  if (infoChef.message) {
    throw new Error(infoChef.message);
  }
  return infoChef;
}



(async () => {
  try {
    const birthday = await getChefBirthday(1);
    console.log(birthday.birthDate)
  }
  catch (err) {
    console.error("errore :", err)
  } finally {
    console.log("Operazione finita")
  }
})();