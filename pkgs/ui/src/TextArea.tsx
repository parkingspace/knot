import clsx from 'clsx'
import { Component, JSX, splitProps } from 'solid-js'

type TextAreaProps = JSX.HTMLAttributes<HTMLDivElement>

const TextArea: Component<TextAreaProps> = (props) => {
  const [, rest] = splitProps(props, ['children', 'class'])

  return (
    <div
      id='text-area'
      ref={props.ref}
      class={clsx(
        'w-full flex flex-1 max-h-full justify-center overflow-hidden',
        props.class,
      )}
      {...rest}
    >
      {props.children}
    </div>
  )
}

export { TextArea }
