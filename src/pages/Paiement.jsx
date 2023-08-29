import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckOutForm";
import { useLocation } from "react-router-dom";

import "../assets/styles/paiement.scss";

const stripePromise = loadStripe(
  "pk_test_51NkP2BCogNykTAl5acaJESspG3j5tf4kW5xVUEqz6uyXllyA3LZ2x82MhytN8nF5SM21IWZfz9sVRUvXQEp7p3L100DraGGnGQ"
);

const Paiement = ({ token }) => {
  const location = useLocation();
  const { price, name, productId } = location.state;
  const productPrice = (Math.round(price * 100) / 100).toFixed(2);
  const total = (
    Number(productPrice) +
    Number(productPrice) / 100 +
    Number(productPrice) / 50
  ).toFixed(2);

  return (
    <main className="pay">
      {token ? (
        <>
          <section>
            <h2>Résumé de la commande</h2>
            <div>
              <span>Prix de l'article</span>
              <span>{productPrice} €</span>
            </div>
            <div>
              <span>Frais protection acheteurs</span>
              <span>{(productPrice / 100).toFixed(2)} €</span>
            </div>
            <div>
              <span>Frais de port</span>
              <span>{(productPrice / 50).toFixed(2)} €</span>
            </div>
          </section>
          <section>
            <div className="bold">
              <span>Total</span>
              <span>{total} €</span>
            </div>
          </section>
          <section>
            <p>
              Il ne vous reste plus qu'une étape pour vous offrir{" "}
              <span className="bold">{name}</span>. Vous allez payer{" "}
              <span className="bold">{total} €</span> (frais de protection et
              frais de port inclus).
            </p>
          </section>
          <section>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                token={token}
                price={total}
                name={name}
                productId={productId}
              />
            </Elements>
          </section>
        </>
      ) : (
        <section className="notconnected">
          <h2>Tu dois être connecté pour acheter un article.</h2>
          <section className="form">
            <button
              onClick={() => {
                isVisible();
              }}
              disabled={visible}
            >
              S'inscrire
            </button>
            <button
              onClick={() => {
                isVisible();
              }}
              disabled={!visible}
            >
              Se connecter
            </button>
          </section>
          {visible ? (
            <SignUp handleToken={handleToken} isVisible={isVisible} />
          ) : (
            <LogIn handleToken={handleToken} isVisible={isVisible} />
          )}
        </section>
      )}
    </main>
  );
};

export default Paiement;
