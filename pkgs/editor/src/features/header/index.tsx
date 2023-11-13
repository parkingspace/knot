import clsx from "clsx";

// TODO: Add breadcrumbs to the header
export const initHeader = () => {
  return (
    <div
      class={clsx("fixed z-50 flex p-2 justify-between right-0", {})}
    >
      <div
        class={clsx("flex flex-row opacity-0 transition-opacity delay-300", {})}
      >
      </div>
      <div class="pr-4">
      </div>
    </div>
  );
};
