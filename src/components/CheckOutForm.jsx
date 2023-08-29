import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ token, price, name, productId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [id, setId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--vinted-backend--hxhcg25qdky2.code.run/user?token=${token}`
      );
      setId(response.data);
    };
    fetchData();
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // On récupère ici les données bancaires que l'utilisateur rentre
    const cardElement = elements.getElement(CardElement);

    // Demande de création d'un token via l'API Stripe
    // On envoie les données bancaires dans la requête
    const stripeResponse = await stripe.createToken(cardElement, {
      name: id,
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;
    // Une fois le token reçu depuis l'API Stripe
    // Requête vers notre serveur
    // On envoie le token reçu depuis l'API Stripe
    try {
      const response = await axios.post(
        `https://site--vinted-backend--hxhcg25qdky2.code.run/offer/${productId}/pay`,
        {
          stripeToken,
          price,
          name,
          id,
        }
      );
      console.log(response.data);
      // Si la réponse du serveur est favorable, la transaction a eu lieu
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.response.data);
    }
    setIsLoading(false);
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit" disabled={isLoading}>
            Payer
          </button>
        </form>
      ) : (
        <span>Paiement effectué ! </span>
      )}
    </>
  );
};

export default CheckoutForm;
