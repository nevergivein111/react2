import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import { useEffect, useReducer } from "react";

function App() {
  // 'loading', 'error', 'ready', 'active', 'finished'
  const initialState = { status: "loading", questions: [] };

  function reducer(state, action) {
    switch (action.type) {
      case "datareceived":
        return { ...state, status: "active" };
      case "dataFailed":
        return { ...state, status: "error" };
      case "ready":
        return { ...state, status: "ready", questions: action.payload };
      default:
        throw new Error("Action Unknown Mohsin");
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "ready", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const { status, questions } = state;

  const numQuestions = questions.length;

  return (
    <div className="app">
      <Main>
        <Header />
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
            questions={questions}
          />
        )}
        {status === "active" &&
          questions.map((questions) => <p>{questions.question}</p>)}
      </Main>
    </div>
  );
}

export default App;
