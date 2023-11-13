import * as TablerIcons from "@tabler/icons-solidjs";

type IconProps = {
  name: keyof typeof TablerIcons;
};

export const Icon = (props: IconProps) => {
  const Icon = TablerIcons[props.name];
  return <Icon size={20} stroke={"1.6"} />;
};
