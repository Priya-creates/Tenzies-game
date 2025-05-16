export default function Die(props) {
  const styleObject = {
    backgroundColor: props.isHeld ? "#59e391" : "white",
  };

  return (
    <button className="tab" style={styleObject} onClick={props.onButtonClick} aria-label =
    {`Die with value ${props.value}, ${props.isHeld ? "Held" : "Not Held"}`} aria-pressed={props.isHeld}>
      {props.value} 
      
    </button>
  );
}
