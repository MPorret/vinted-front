import SignUp from "./SignUp";
import LogIn from "./LogIn";

const Modal = ({ handleToken, isVisible, visible, setIsModal }) => {
  return (
    <div className="modal">
      <div>
        <div
          className="close"
          onClick={() => {
            setIsModal(false);
          }}
        >
          X
        </div>
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
      </div>
    </div>
  );
};

export default Modal;
