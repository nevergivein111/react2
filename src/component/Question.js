import Option from "./Option";

function Question({ question, correctAnswer, dispatch }) {
  return (
    <div>
      <button className="btn btn-option">
        <h2>{question.question}</h2>
      </button>
      <Option
        question={question}
        correctAnswer={correctAnswer}
        dispatch={dispatch}
      />
    </div>
  );
}

export default Question;
