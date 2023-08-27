import Switch from "react-switch";
import { Range, getTrackBackground } from "react-range";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Filters = ({ sort, setSort, price, setPrice }) => {
  const STEP = 5;
  const MIN = 0;
  const MAX = 500;

  const handleChange = () => {
    setSort(!sort);
  };

  return (
    <>
      <div>
        <label htmlFor="price">Prix entre </label>
        <output id="output">
          {price.values[0].toFixed(0)} - {price.values[1].toFixed(0)} €
        </output>
        <Range
          step={STEP}
          min={MIN}
          max={MAX}
          values={price.values}
          onChange={(values) => setPrice({ values })}
          id="price"
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "7px",
                width: "100%",
                borderRadius: "10px",
                backgroundColor: "#ccc",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "7px",
                  width: "100%",
                  borderRadius: "10px",
                  background: getTrackBackground({
                    values: price.values,
                    colors: ["#ccc", "var(--vinted-blue)", "#ccc"],
                    min: MIN,
                    max: MAX,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "15px",
                width: "15px",
                borderRadius: "50%",
                backgroundColor: isDragged ? "var(--vinted-blue)" : "#f1f1f1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            ></div>
          )}
        />
      </div>

      <div>
        <label htmlFor="sort">Trier par</label>
        <Switch
          id="sort"
          onChange={() => {
            handleChange();
          }}
          checked={sort}
          offColor="#007782"
          onColor="#007782"
          uncheckedIcon={false}
          checkedIcon={false}
          uncheckedHandleIcon={
            <FontAwesomeIcon icon="arrow-up" className="switchIcon" />
          }
          checkedHandleIcon={
            <FontAwesomeIcon icon="arrow-down" className="switchIcon" />
          }
        />
      </div>
    </>
  );
};

export default Filters;
