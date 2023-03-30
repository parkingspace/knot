import { Button } from "@suid/material";
import { Component } from "solid-js";

export interface IButtonProps {
  name?: string | undefined;
  color?: "primary" | "secondary" | "inherit" | "error" | "info" | "success" | "warning";
  size?: "small" | "medium" | "large";
}

export const TextButton: Component<IButtonProps> = (props) => {
  return (
    <Button variant="text" color={props.color} size={props.size}>
      {props.name ?? "button"}
    </Button>
  );
};

export const ElevatedButton: Component<IButtonProps> = (props) => {
  return (
    <Button variant="contained" color={props.color} size={props.size}>
      {props.name ?? "button"}
    </Button>
  );
};

export const OutlinedButton: Component<IButtonProps> = (props) => {
  return (
    <Button variant="outlined" color={props.color} size={props.size}>
      {props.name ?? "button"}
    </Button>
  );
};
