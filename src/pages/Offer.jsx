import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Loading from "./Loading";

const Offer = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <main className="offer">
      <section className="carousel">
        {data.product_pictures.lenght !== 1 ? (
          data.product_pictures.map(({ secure_url }) => {
            return <img key={secure_url} src={secure_url} />;
          })
        ) : (
          <img src={data.product_pictures[0].secure_url} />
        )}
      </section>
      <aside>
        <section>
          <h2>{data.product_price} €</h2>
          <Link>Acheter</Link>
          <Link>Faire une offre</Link>
          <Link>Message</Link>
          <Link>Favoris</Link>
        </section>
        <section>
          {data.product_details[0].MARQUE && (
            <div>
              <span>MARQUE</span>
              <span>{data.product_details[0].MARQUE}</span>
            </div>
          )}
          {data.product_details[1].ÉTAT && (
            <div>
              <span>ETAT</span>
              <span>{data.product_details[1].ÉTAT}</span>
            </div>
          )}
          {/* <div>
            <span>MATIERE</span>
            <span></span>
          </div> */}
          {data.product_details[2].COULEUR && (
            <div>
              <span>COULEUR</span>
              <span>{data.product_details[2].COULEUR}</span>
            </div>
          )}
          {data.product_details[3].EMPLACEMENT && (
            <div>
              <span>LOCALISATION</span>
              <span>{data.product_details[3].EMPLACEMENT}</span>
            </div>
          )}
          {/* <div>
            <span>OPTIONS DE PAIEMENT</span>
            <span></span>
          </div>
          <div>
            <span>NOMBRE DE VUES</span>
            <span></span>
          </div> */}
          <div>
            <span>AJOUTE</span>
            <span>{data.product_date}</span>
          </div>
        </section>
        {data.product_description && (
          <section>
            <p>{data.product_description}</p>
          </section>
        )}
      </aside>
    </main>
  );
};

export default Offer;
