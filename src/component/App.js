import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import { useEffect, useReducer } from "react";
import Question from "./Question";
import NextQuestion from "./NextQuestion";

function App() {
  // 'loading', 'error', 'ready', 'active', 'finished'
  const initialState = {
    status: "loading",
    questions: [],
    index: 0,
    answer: null,
    points: 0,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "datareceived":
        return { ...state, status: "active" };
      case "dataFailed":
        return { ...state, status: "error" };
      case "nextbutton":
        return { ...state, answer: null, index: state.index + 1 };
      case "newAnswer":
        const question = state.questions[state.index];
        const newPoints =
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points;

        return { ...state, answer: action.payload, points: newPoints };
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

  console.log(state);

  const { status, questions, index, answer, points } = state;

  const numQuestions = questions.length;
  const totalpoints = questions.reduce((acc, news) => acc + news.points, 0);

  console.log(totalpoints);

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
        {status === "active" && (
          <>
            <Question
              question={questions[index]}
              correctAnswer={answer}
              dispatch={dispatch}
              numQuestions={numQuestions}
              index={index}
              totalpoints={totalpoints}
              points={points}
            />
            <NextQuestion dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
