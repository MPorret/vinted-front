import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "../assets/styles/offer.scss";

import Loading from "./Loading";

const Offer = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://site--vinted-backend--hxhcg25qdky2.code.run/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      };

      fetchData();
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, [id]);

  return isLoading ? (
    <Loading />
  ) : (
    <main className="offer">
      <section className="carousel">
        {data.product_image.lenght !== 1 ? (
          data.product_image.map(({ secure_url }) => {
            return <img key={secure_url} src={secure_url} alt="" />;
          })
        ) : (
          <img src={data.product_image[0].secure_url} alt="" />
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
          {data.product_details.map((detail) => {
            if (detail[Object.keys(detail)]) {
              return (
                <div key={Object.keys(detail)}>
                  <span>{Object.keys(detail)} :</span>
                  <span>{detail[Object.keys(detail)]}</span>
                </div>
              );
            } else {
              return null;
            }
          })}
          <div>
            <span>AJOUTE :</span>
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
