function NextQuestion({ dispatch, answer }) {
  if (answer == null) return;
  return (
    <button class="btn" onClick={() => dispatch({ type: "nextbutton" })}>
      Next{" "}
    </button>
  );
}
export default NextQuestion;
