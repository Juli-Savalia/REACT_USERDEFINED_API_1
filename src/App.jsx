import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [country, setCountry] = useState([]);
  const [State, setState] = useState([]);
  const [con, setCon] = useState("");
  const [City, setCity] = useState("");
  const [state_id, setStateId] = useState("");

  const data_country = async () => {
    try {
      let getrecordCountry = await axios.get("http://localhost:8000/Country");
      console.log(getrecordCountry.data);
      setCountry(getrecordCountry.data);
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    data_country();
  }, []);

  // State

  const data_State = async () => {
    try {
      let getrecordState = await axios.get("http://localhost:8000/State");
      let filterrec = getrecordState.data.filter(
        (val) => val.country_id == con
      );

      setState(filterrec);
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    data_State();
    console.log(con);
  }, [con]);

  return (
    <div>
      <form>
        {/* country */}
        <select onChange={(e) => setCon(e.target.value)} value={con}>
          <option>---Select Country---</option>
          {country.map((c) => {
            return (
              <option key={c.id} value={c.id}>
                {c.country_name}
              </option>
            );
          })}
        </select>
        {/* State */}
        <select>
          <option>---Select State---</option>
          {State.map((c) => {
            return (
              <option key={c.id} value={c.id}>
                {c.state_name}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
};

export default App;
