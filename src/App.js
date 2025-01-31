import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import { useEffect, useReducer } from "react";

function App() {
  const initialState = { status: "loading", questions: [] };
  function reducer(state, action) {
    switch (action.type) {
      case "datareceived":
        return { ...state, status: "ready", questions: action.payload };
      case "dataFailed":
        return { ...state, status: "error" };
      default:
        throw new Error("Action Unknown Mohsin");
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "datareceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFaileds" }));
  }, []);

  const { status, questions } = state;

  console.log(status);

  return (
    <div className="app">
      <Main>
        <Header />
        {status === "loading" && <Loader />}
        {questions.map((questions) => (
          <p>{questions.question}</p>
        ))}
      </Main>
    </div>
  );
}

export default App;
