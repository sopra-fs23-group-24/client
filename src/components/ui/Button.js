import "styles/ui/Button.scss";

export const Button = props => (
  <button
    {...props}
    style={{width: props.width, ...props.style}}
    className={`primary-button ${props.className}`}>
    {props.children}
  </button>
);

export const secondButton = props => (
    <button
        {...props}
        style={{width: props.width, ...props.style}}
        className={`secondary-button ${props.className}`}>
      {props.children}
    </button>
);