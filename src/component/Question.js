import Option from "./Option";

function Question({ question }) {
  console.log(question);
  return (
    <div>
      <button className="btn btn-option">{question.question}</button>
      <Option question={question} />
    </div>
  );
}

export default Question;
