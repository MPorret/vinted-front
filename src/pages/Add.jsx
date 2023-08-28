import "../assets/styles/add.scss";
import { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

const Add = ({ token }) => {
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

  const [file, setFile] = useState({});
  console.log("ici", file);

  const handleChange = (event, { arg }) => {
    const newObject = { ...value };
    newObject[arg] = event.target.value;
    setValue(newObject);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("picture", file);
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
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <main className="add">
      <h1>Vends ton article</h1>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        {token ? (
          <>
            <section>
              <Dropzone
                onDrop={(acceptedFiles) => {
                  setFile(acceptedFiles[0]);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p style={{ border: "1px solid black" }}>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
              {/* <input
                type="file"
                name="picture"
                id="picture"
                onChange={(event) => {
                  setFile(event.target.files[0]);
                }}
              /> */}
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
              <input
                type="text"
                name="description"
                id="description"
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
                type="text"
                name="price"
                id="price"
                placeholder="0.00"
                value={value.price}
                onChange={(event) => {
                  handleChange(event, { arg: "price" });
                }}
              />
              €
            </section>
            <button>Ajouter</button>
          </>
        ) : (
          <section>
            <h2>Vous devez être connecté pour vendre vos articles</h2>
          </section>
        )}
      </form>
    </main>
  );
};

export default Add;
