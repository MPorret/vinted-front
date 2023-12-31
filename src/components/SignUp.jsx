import { useState } from "react";
// import Cookies from "js-cookie";
import axios from "axios";
import Dropzone from "react-dropzone";

const SignUp = ({ handleToken, isVisible }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
  });

  const [file, setFile] = useState({});

  const [errorMessage, setErrorMessage] = useState();

  const handleChange = (event, { action }) => {
    const newData = { ...data };
    switch (action) {
      case "password":
        newData.password = event.target.value;
        break;
      case "username":
        newData.username = event.target.value;
        break;
      case "email":
        newData.email = event.target.value;
        break;
      case "newsletter":
        newData.newsletter = !data.newsletter;
        break;
      default:
        break;
    }

    setData(newData);
  };

  const signUp = async () => {
    try {
      const formData = new FormData();
      formData.append("picture", file);
      formData.append("username", data.username);
      formData.append("newsletter", data.newsletter);
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await axios.post(
        "https://site--vinted-backend--hxhcg25qdky2.code.run/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleToken(response.data.token);
      isVisible("0");
    } catch (error) {
      // console.log(error.response.data);
      if (error.response.data.message === "Email already existing") {
        // Je met à jour mon state errorMessage
        setErrorMessage(
          "Ce mail est déjà utilisé, veuillez en choisir un autre :)"
        );
      } else if (error.response.data.message === "Please, complete the form") {
        setErrorMessage("Veuillez remplir tous les champs :)");
      }
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      {/* <div
        className="close"
        onClick={() => {
          isVisible("0");
        }}
      >
        X
      </div> */}
      <h3>S'inscrire</h3>

      {file.name ? (
        <div>
          <p key={file.name}>Avatar : {file.name}</p>
        </div>
      ) : (
        <Dropzone
          onDrop={(acceptedFiles) => {
            setFile(acceptedFiles[0]);
            console.log("ici", file);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section className="uploadavatar">
              <div {...getRootProps()}>
                <input {...getInputProps()} multiple="multiple" />
                <p>
                  Cliquer-glisser votre avatar ici ou cliquer pour sélectionner
                  l'image
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      )}
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Nom d'utilisateur"
        value={data.username}
        onChange={(event) => {
          handleChange(event, { action: "username" });
        }}
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={data.email}
        onChange={(event) => {
          handleChange(event, { action: "email" });
        }}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Mot de passe"
        value={data.password}
        onChange={(event) => {
          handleChange(event, { action: "password" });
        }}
      />
      <div>
        <input
          type="checkbox"
          name="newsletter"
          id="newsletter"
          checked={data.newsletter}
          onChange={(event) => {
            handleChange(event, { action: "newsletter" });
          }}
        />
        <label htmlFor="newsletter" id="newsletter">
          S'inscrire à la newsletter
        </label>
      </div>
      <p>
        En m'inscrivant je confirme avoir lu et accepté les Termes & Conditions
        et Potilique de Confidentialité de Vinted. Je confirme avoir au moins 18
        ans.
      </p>
      <button
        onClick={() => {
          signUp();
        }}
      >
        S'inscrire
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button
        onClick={() => {
          isVisible("0");
        }}
      >
        Tu as déjà un compte ? Connecte-toi !
      </button>
    </form>
  );
};

export default SignUp;
