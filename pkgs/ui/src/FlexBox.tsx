// TODO: Use this component to create a flexbox
import { JSX } from "solid-js";

type propType = JSX.HTMLAttributes<HTMLDivElement>;
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element;

const FlexBox: Component = (props) => {
  return (
    <div class="">
      {props.children}
    </div>
  );
};
