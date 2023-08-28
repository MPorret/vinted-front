import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import tear from "../assets/tear-d431548c90905ad757632e4c3075d9473e38c7c6642721efeae9413afb9387a2.svg";

import "../assets/styles/home.scss";

import Loading from "./Loading";
import Filters from "../components/Filters";

const Home = ({ search }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [sort, setSort] = useState(false);
  const [price, setPrice] = useState({ values: [0, 100] });

  useEffect(() => {
    const fetchData = () => {
      try {
        const timer = setTimeout(async () => {
          const response = await axios.get(
            `https://site--vinted-backend--hxhcg25qdky2.code.run/offers?page=1&sort=${
              !sort ? "asc" : "desc"
            }&priceMin=${price.values[0]}&priceMax=${
              price.values[1]
            }&search=${search}`
          );
          setData(response.data);
          setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
      } catch (error) {
        console.log(error.message);
      }
    };
    console.log(price.values[0]);

    fetchData();
  }, [sort, price, search]);

  return isLoading ? (
    <Loading />
  ) : (
    <main className="home">
      {/* Banner */}
      <div>
        <img
          src="https://static.vinted.com/assets/seller-promotion/other/banner-tablets-up-afe3d19776592a72f165c1bb93fd02c5528250a8c670ecc1656654323f9d4856.jpg"
          alt="Dressing avec une femme souriante"
        />
        <img src={tear} alt="tear" className="tear" />
        <div>
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <Link to="/publish">Commencer à vendre</Link>
        </div>
      </div>
      {/* List of products */}
      <section>
        <Filters
          sort={sort}
          setSort={setSort}
          price={price}
          setPrice={setPrice}
        />
      </section>
      <section className="allproducts">
        {data.map(
          ({ _id, product_price, product_details, product_image, owner }) => {
            return (
              <Link key={_id} to={`/offer/${_id}`}>
                <article>
                  <div>
                    {owner.account.avatar && (
                      <img
                        src={owner.account.avatar["0"].secure_url}
                        alt=""
                        className="avatar"
                      />
                    )}

                    <span>{owner.account.username}</span>
                  </div>
                  <img src={product_image["0"].secure_url} alt="" />
                  <div>
                    <p>{product_price} €</p>
                    {product_details.map((detail, index) => {
                      if (detail.MARQUE || detail.TAILLE) {
                        return (
                          <p key={index}>{detail.MARQUE || detail.TAILLE}</p>
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
