function Option({ question }) {
  return (
    <div>
      {question.options.map((options) => (
        <div>
          <button className="btn btn-option">{options}</button>
        </div>
      ))}
    </div>
  );
}

export default Option;
