import {
  cloneElement,
  isValidElement,
  useId,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
} from 'react';

type TriggerProps = {
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
  onBlur?: (event: FocusEvent<HTMLElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
  'aria-describedby'?: string;
};

export function Tooltip({ content, children }: { content: string; children: ReactElement<TriggerProps> }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  if (!isValidElement(children)) return null;
  const trigger = cloneElement(children, {
    'aria-describedby': open ? id : children.props['aria-describedby'],
    onFocus: (event: FocusEvent<HTMLElement>) => {
      setOpen(true);
      children.props.onFocus?.(event);
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      setOpen(false);
      children.props.onBlur?.(event);
    },
    onMouseEnter: (event: MouseEvent<HTMLElement>) => {
      setOpen(true);
      children.props.onMouseEnter?.(event);
    },
    onMouseLeave: (event: MouseEvent<HTMLElement>) => {
      setOpen(false);
      children.props.onMouseLeave?.(event);
    },
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Escape') setOpen(false);
      children.props.onKeyDown?.(event);
    },
  });

  return (
    <span className="sutra-tooltip">
      {trigger}
      <span role="tooltip" id={id} className="sutra-tooltip-bubble" hidden={!open}>
        {content}
      </span>
    </span>
  );
}
