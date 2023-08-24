import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import tear from "../assets/tear-d431548c90905ad757632e4c3075d9473e38c7c6642721efeae9413afb9387a2.svg";

import Loading from "./Loading";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/offers"
    );
    setData(response.data.offers);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return isLoading ? (
    <Loading />
  ) : (
    <main>
      {/* Banner */}
      <div>
        <img
          src="https://static.vinted.com/assets/seller-promotion/other/banner-tablets-up-afe3d19776592a72f165c1bb93fd02c5528250a8c670ecc1656654323f9d4856.jpg"
          alt="Dressing avec une femme souriante"
        />
        <img src={tear} alt="tear" className="tear" />
        <div>
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <Link>Commencer à vendre</Link>
        </div>
      </div>
      {/* List of products */}
      <section className="allproducts">
        {data.map(
          ({ _id, product_price, product_details, product_image, owner }) => {
            return (
              <Link key={_id} to={`/offer/${_id}`}>
                <article>
                  <div>
                    {owner.account.avatar && (
                      <img
                        src={owner.account.avatar.secure_url}
                        alt=""
                        className="avatar"
                      />
                    )}

                    <span>{owner.account.username}</span>
                  </div>
                  <img src={product_image.secure_url} alt="" />
                  <div>
                    <p>{product_price} €</p>
                    {product_details.map((detail) => {
                      if (detail.MARQUE || detail.TAILLE) {
                        return (
                          <p key={detail.MARQUE}>
                            {detail.MARQUE || detail.TAILLE}
                          </p>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                </article>
              </Link>
            );
          }
        )}
      </section>
    </main>
  );
};

export default Home;
