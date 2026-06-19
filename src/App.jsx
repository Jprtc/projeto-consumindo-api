import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [dogImage, setDogImage] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const requestUrl = 'https://dog.ceo/api/breeds/image/random'


  async function buscarDog() {
      try {
        setIsLoading(true)
        const response = await fetch(requestUrl);

        const data = await response.json();
        console.log(data)

        setDogImage(data.message);
        setError(null)

      } catch (error) {

        console.log(error);
        setError('Não foi possível carregar o doggo :(')

      } finally{
        setIsLoading(false)
      }
    }

  useEffect(() => {
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    buscarDog();
  }, []);

  return (
    <>
      <section id="center">
        <h1>Foto de um cachorro aleatório 🐶 </h1>

        {isLoading && <p>Carregando o dog...</p>}
        {error && <p>{error}</p>}

        {!isLoading && !error && dogImage && (
          <img src={dogImage} width={400}/>
        )}

        <button onClick={buscarDog}>Ver outro Dog</button>

      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
