import clsx from "clsx";
import { Accessor, JSX, onMount } from "solid-js";

type propType = JSX.HTMLAttributes<HTMLDivElement> & {
  isSidebarOpen: Accessor<boolean>;
};
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element;

const BaseLayout: Component = (props) => {
  return (
    <div
      class={clsx("grid grid-cols-with-sidebar h-full")}
    >
      {props.children}
    </div>
  );
};

export { BaseLayout };
