import React, { useState, useReducer, useEffect } from "react";

/* Components */
import { Button, Select } from "antd";
import Bar from "./components/Bar";
import Loader from "./components/Loader";

/* Reducer */
import reducer from "./reducer";

/* Styles */
import "./App.less";

const ButtonGroup = Button.Group;
const Option = Select.Option;
const API = "https://pb-api.herokuapp.com/bars";

const initialState = {
  defaultBars: [],
  bars: [],
  buttons: [],
  limit: 0,
  activeBar: 0,
  changed: false
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { bars, buttons, limit, activeBar, changed } = state;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);

    fetch(API)
      .then(response => response.json())
      .then(data => {
        setLoading(false);

        dispatch({
          type: "SET_INITIAL",
          payload: { ...data, defaultBars: data.bars }
        });
      })
      .catch(e => console.log(e));
  };

  const handleChangeBar = e => {
    let index;
    if (typeof e === "number") {
      index = e;
    } else {
      index = Number(e.target.value);
    }

    dispatch({ type: "CHANGE_BAR", payload: { index } });
  };

  const handleUpdateProgress = value => {
    dispatch({ type: "UPDATE_PROGRESS", payload: { value } });
  };

  const getProgress = value => {
    const progressValue = (value / limit) * 100;

    return progressValue > 100 ? 100 : progressValue;
  };

  return (
    <div id="root">
      <h3>Progress Bars Demo by James Wong</h3>

      {loading ? (
        <Loader />
      ) : (
        <>
          {/* TOP PANEL */}
          <div className="control-panel">
            <div className="left-panel">
              <Select
                size="small"
                onChange={handleChangeBar}
                value={activeBar}
                style={{ width: 120 }}
              >
                {bars.map((item, index) => (
                  <Option key={index} value={index}>{`#Progress ${index +
                    1}`}</Option>
                ))}
              </Select>
            </div>

            <div className="right-panel">
              {changed && (
                <Button
                  size="small"
                  onClick={() => dispatch({ type: "RESET" })}
                >
                  Reset
                </Button>
              )}
              <Button type="primary" size="small" onClick={fetchData}>
                Reload
              </Button>
            </div>
          </div>
          {/* END TOP PANEL */}

          <>
            {/* SHOW BARS */}
            {bars.map((item, index) => (
              <Bar
                setActive={() => handleChangeBar(index)}
                key={index}
                index={index}
                disabled={index !== activeBar}
                value={item}
                progressValue={getProgress(item, true)}
                limitExceeded={item >= limit}
              />
            ))}

            <Bar />

            {/* PROGRESS CONTROL PANEL */}
            <div className="update-progress-buttons">
              <ButtonGroup>
                {buttons.map((value, index) => (
                  <Button
                    key={index}
                    onClick={() => handleUpdateProgress(value)}
                  >
                    {value}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          </>
        </>
      )}
    </div>
  );
};

export default App;
