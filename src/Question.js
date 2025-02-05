function Question({ question }) {
  console.log(question);
  return (
    <div>
      <button className="btn btn-option">{question.question}</button>
    </div>
  );
}

export default Question;
