import Option from "./Option";

function Question({
  points,
  totalpoints,
  question,
  correctAnswer,
  dispatch,
  numQuestions,
  index,
}) {
  return (
    <div>
      Question {index} /{numQuestions}
      points {points} /{totalpoints}
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
