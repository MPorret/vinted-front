import "../assets/styles/publish.scss";
import { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import LogIn from "../components/LogIn";
import SignUp from "../components/SignUp";

const Publish = ({ isVisible, token, handleToken, visible }) => {
  const navigate = useNavigate();

  const [value, setValue] = useState({
    title: "",
    description: "",
    price: "",
    condition: "",
    city: "",
    brand: "",
    size: "",
    color: "",
  });

  const [file, setFile] = useState([]);

  const handleChange = (event, { arg }) => {
    const newObject = { ...value };
    newObject[arg] = event.target.value;
    setValue(newObject);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("picture", file[i]);
    }
    formData.append("title", value.title);
    formData.append("description", value.description);
    formData.append("size", value.size);
    formData.append("brand", value.brand);
    formData.append("city", value.city);
    formData.append("condition", value.condition);
    formData.append("price", value.price);
    formData.append("color", value.color);

    try {
      const response = await axios.post(
        "https://site--vinted-backend--hxhcg25qdky2.code.run/offers",
        formData,
        {
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setValue({
        title: "",
        description: "",
        price: "",
        condition: "",
        city: "",
        brand: "",
        size: "",
        color: "",
      });
      setFile([]);

      navigate(`/offer/${response.data._id}`);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <main className="add">
      <h1>Vends ton article</h1>
      {token ? (
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <section>
            <Dropzone
              onDrop={(acceptedFiles) => {
                const newTab = [...file];
                for (let i = 0; i < acceptedFiles.length; i++) {
                  newTab.push(acceptedFiles[i]);
                }

                setFile(newTab);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="upload">
                  <input {...getInputProps()} multiple="multiple" />
                  <p style={{ textAlign: "center" }}>
                    Cliquer-glisser vos images ici ou cliquer pour sélectionner
                    les fichiers
                  </p>
                </div>
              )}
            </Dropzone>
            {file.length > 0 && (
              <div>
                {file.map((file) => {
                  return <p key={file.name}>{file.name}</p>;
                })}
              </div>
            )}
          </section>
          <section>
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="ex: Chemise Sézane verte"
              value={value.title}
              onChange={(event) => {
                handleChange(event, { arg: "title" });
              }}
            />
            <label htmlFor="description">Décris ton article</label>
            <textarea
              name="description"
              id="description"
              rows="5"
              placeholder="ex: porté quelquefois, taille correctement"
              value={value.description}
              onChange={(event) => {
                handleChange(event, { arg: "description" });
              }}
            />
          </section>
          <section>
            <label htmlFor="brand">Marque</label>
            <input
              type="text"
              name="brand"
              id="brand"
              placeholder="ex: Zara"
              value={value.brand}
              onChange={(event) => {
                handleChange(event, { arg: "brand" });
              }}
            />
            <label htmlFor="size">Taille</label>
            <input
              type="text"
              name="size"
              id="size"
              placeholder="ex: L / 40 / 12"
              value={value.size}
              onChange={(event) => {
                handleChange(event, { arg: "size" });
              }}
            />
            <label htmlFor="color">Couleur</label>
            <input
              type="text"
              name="color"
              id="color"
              placeholder="ex: Bleu"
              value={value.color}
              onChange={(event) => {
                handleChange(event, { arg: "color" });
              }}
            />
            <label htmlFor="condition">Etat</label>
            <input
              type="text"
              name="condition"
              id="condition"
              placeholder="ex: Neuf avec étiquette"
              value={value.condition}
              onChange={(event) => {
                handleChange(event, { arg: "condition" });
              }}
            />
            <label htmlFor="eplacement">Lieu</label>
            <input
              type="text"
              name="emplacement"
              id="emplacement"
              placeholder="ex: Paris"
              value={value.city}
              onChange={(event) => {
                handleChange(event, { arg: "city" });
              }}
            />
          </section>
          <section>
            <label htmlFor="price">Prix</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="0.00 €"
              value={value.price}
              onChange={(event) => {
                handleChange(event, { arg: "price" });
              }}
            />
          </section>
          <button>Ajouter</button>
        </form>
      ) : (
        <section className="notconnected">
          <h2>Tu dois être connecté pour vendre tes articles.</h2>
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

export default Publish;
